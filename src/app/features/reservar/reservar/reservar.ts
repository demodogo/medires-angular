import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@/app/core/models/user.model';
import { Auth } from '@/app/core/services/auth/auth';
import { Subscription } from 'rxjs';
import { SPECIALTIES, SpecialtyOption } from '@/app/features/reservar/reservar/reservar.config';

type ReservationPayload = {
  patientId: number;
  patientName: string;
  date: string;
  time: string;
  specialty: string;
  doctorName: string;
  reason?: string;
};

@Component({
  selector: 'app-reservar',
  standalone: false,
  templateUrl: './reservar.html',
  styleUrl: './reservar.css',
})
export class Reservar implements OnInit, OnDestroy {
  reservationForm!: FormGroup;
  currentUser: User | null = null;
  private sub?: Subscription;
  successMessage = '';
  lastReservation: ReservationPayload | null = null;
  specialties: SpecialtyOption[] = SPECIALTIES;
  doctorsForSelected: string[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      date: ['', [Validators.required, this.dateValidator]],
      time: ['', [Validators.required]],
      specialty: [null, [Validators.required]],
      doctor: [null, [Validators.required]],
      reason: [''],
    });

    this.sub = this.auth.currentUser$.subscribe((user) => {
      this.currentUser = user || null;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  get date() {
    return this.reservationForm.get('date');
  }

  get time() {
    return this.reservationForm.get('time');
  }

  get specialty() {
    return this.reservationForm.get('specialty');
  }

  get doctor() {
    return this.reservationForm.get('doctor');
  }

  get reason() {
    return this.reservationForm.get('reason');
  }

  onSpecialtyChange(): void {
    const selectedId = this.specialty?.value as string | null;
    const selected = this.specialties.find((s) => s.id === selectedId);

    this.doctorsForSelected = selected?.doctors ?? [];

    this.doctor?.reset(null);
  }

  onSubmit(): void {
    this.successMessage = '';

    if (this.reservationForm.invalid || !this.currentUser) {
      this.reservationForm.markAllAsTouched();
      return;
    }

    const formValue = this.reservationForm.value;
    this.lastReservation = {
      patientId: this.currentUser.id,
      patientName: `${this.currentUser.name} ${this.currentUser.lastName}`,
      date: formValue.date,
      time: formValue.time,
      doctorName: formValue.doctor,
      specialty: this.getSpecialtyName(formValue.specialty),
      reason: formValue.reason ?? '',
    };

    this.successMessage = 'Reserva realizada correctamente';

    this.reservationForm.reset();
    this.doctorsForSelected = [];
  }

  getSpecialtyName(id: string): string {
    const s = this.specialties.find((sp) => sp.id === id);
    return s?.name ?? '';
  }

  resetForm(): void {
    this.lastReservation = null;
    this.successMessage = '';
    this.reservationForm.reset();
    this.doctorsForSelected = [];
  }

  dateValidator(control: any) {
    if (!control.value) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(control.value);

    return selected >= today ? null : { pastDate: true };
  }
}
