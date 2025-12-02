import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@/app/core/models/user.model';
import { Auth } from '@/app/core/services/auth/auth';
import { Subscription } from 'rxjs';
import {
  DoctorType,
  SPECIALTIES,
  SpecialtyOption,
} from '@/app/features/reservar/reservar/reservar.config';
import { Reservations } from '@/app/core/services/reservations/reservations';

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
  doctorsForSelected: DoctorType[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private reservationService: Reservations,
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      date: ['', [Validators.required, this.dateValidator]],
      time: ['', [Validators.required]],
      specialty: [null, [Validators.required]],
      doctorId: [null, [Validators.required]],
      doctorName: [null],
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

  get doctorId() {
    return this.reservationForm.get('doctorId');
  }

  set doctorName(name: string) {
    this.reservationForm.get('doctorName')?.setValue(name);
  }

  get doctorName() {
    return this.reservationForm.get('doctorName')?.value;
  }

  get reason() {
    return this.reservationForm.get('reason');
  }

  onSpecialtyChange(): void {
    const selectedId = this.specialty?.value as string | null;
    const selected = this.specialties.find((s) => s.id === selectedId);

    this.doctorsForSelected = selected?.doctors ?? [];

    this.doctorId?.reset(null);
  }

  onDoctorChange(): void {
    const selectedId = this.doctorId?.value as number | null;
    const selectedDoctor = this.doctorsForSelected.find((d) => d.id === selectedId);

    if (selectedDoctor) {
      this.doctorName = selectedDoctor.name;
    }
  }

  onSubmit(): void {
    this.successMessage = '';

    if (this.reservationForm.invalid || !this.currentUser) {
      this.reservationForm.markAllAsTouched();
      return;
    }

    const formValue = this.reservationForm.value;
    this.lastReservation = this.reservationService.createReservation({
      date: formValue.date,
      patientId: this.currentUser.id,
      time: formValue.time,
      patientName: `${this.currentUser.name} ${this.currentUser.lastName}`,
      reason: formValue.reason ?? undefined,
      doctorName: formValue.doctorName,
      doctorId: formValue.doctorId,
      specialty: this.getSpecialtyName(formValue.specialty),
    });

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
