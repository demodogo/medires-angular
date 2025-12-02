import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Patient = {
  id: number;
  name: string;
  lastName: string;
  rut: string;
  isActive: boolean;
};

const INITIAL_PATIENTS: Patient[] = [
  {
    id: 4531,
    name: 'Juan',
    lastName: 'Pérez',
    rut: '12345678-9',
    isActive: true,
  },
  {
    id: 111,
    name: 'María',
    lastName: 'González',
    rut: '98.392.212-1',
    isActive: false,
  },
  {
    id: 543,
    name: 'Pedro',
    lastName: 'López',
    rut: '11.434.232-2',
    isActive: true,
  },
  {
    id: 321,
    name: 'Ana',
    lastName: 'Martínez',
    rut: '12.345.678-9',
    isActive: true,
  },
];

@Injectable({
  providedIn: 'root',
})
export class Patients {
  private patients: Patient[] = [...INITIAL_PATIENTS];

  private subject = new BehaviorSubject<Patient[]>(this.patients);
  patients$ = this.subject.asObservable();

  private emit() {
    this.subject.next(this.patients);
  }

  resetMockDate(): void {
    this.patients = [...INITIAL_PATIENTS];
    this.emit();
  }

  getAll(): Patient[] {
    return [...this.patients];
  }

  create(data: Omit<Patient, 'id' | 'isActive'>): Patient {
    const nextId = this.patients.length ? Math.max(...this.patients.map((p) => p.id)) + 13903 : 1;
    const newPatient: Patient = {
      id: nextId,
      isActive: true,
      ...data,
    };

    this.patients = [...this.patients, newPatient];
    this.emit();
    return newPatient;
  }

  update(id: number, data: Partial<Omit<Patient, 'id'>>): Patient | null {
    let updated: Patient | null = null;

    this.patients = this.patients.map((p) => {
      if (p.id === id) {
        updated = { ...p, ...data };
        return updated;
      }
      return p;
    });

    if (updated) this.emit();
    return updated;
  }

  delete(id: number): void {
    this.patients = this.patients.filter((p) => p.id !== id);
    this.emit();
  }
}
