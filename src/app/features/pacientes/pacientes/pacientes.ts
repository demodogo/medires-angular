import { Component, OnDestroy, OnInit } from '@angular/core';
import { Patient, Patients } from '@/app/core/services/patients/patients';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { rutValidator } from '@/app/core/validators/rut.validator';

@Component({
  selector: 'app-pacientes',
  standalone: false,
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes implements OnInit, OnDestroy {
  patients: Patient[] = [];
  form!: FormGroup;
  editingId: number | null = null;
  successMessage = '';
  private sub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private patientsService: Patients,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      rut: ['', [Validators.required, rutValidator]],
      isActive: [true],
    });

    this.sub = this.patientsService.patients$.subscribe((list) => {
      console.log('Lista de pacientes recibida:', list);
      this.patients = list;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get name() {
    return this.form.get('name');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get rut() {
    return this.form.get('rut');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.editingId) {
      this.patientsService.update(this.editingId, {
        name: formValue.name,
        lastName: formValue.lastName,
        rut: formValue.rut,
        isActive: formValue.isActive,
      });
    } else {
      this.patientsService.create({
        name: formValue.name,
        lastName: formValue.lastName,
        rut: formValue.rut,
      });
    }

    this.cancelEdit();
  }

  edit(patient: Patient): void {
    this.editingId = patient.id;
    this.form.patchValue({
      name: patient.name,
      lastName: patient.lastName,
      rut: patient.rut,
      isActive: patient.isActive,
    });
  }

  delete(id: number): void {
    this.patientsService.delete(id);
    if (this.editingId === id) {
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form.reset({ isActive: true });
  }

  formatRut(rut: string): string {
    rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (rut.length <= 1) return rut;

    const body = rut.slice(0, -1);
    const dv = rut.slice(-1);

    const formattedBody =
      body
        .split('')
        .reverse()
        .join('')
        .match(/.{1,3}/g)
        ?.join('.')
        .split('')
        .reverse()
        .join('') ?? body;

    return `${formattedBody}-${dv}`;
  }

  onRutInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatRut(input.value);
    this.form.get('rut')?.setValue(formatted, { emitEvent: false });
  }
}
