import { Injectable } from '@angular/core';
import {
  Reservation,
  ReservationStatus,
  ReservationStatusType,
} from '@/app/core/services/reservations/reservations.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Reservations {
  private reservations: Reservation[] = [
    {
      id: 1,
      patientId: 2,
      patientName: 'Paula Rojas',
      doctorId: 10,
      doctorName: 'Dra. Camila Silva',
      date: '2025-12-03',
      time: '09:00',
      specialty: 'Dermatología',
      status: ReservationStatus.pendiente,
      reason: undefined,
    },
    {
      id: 2,
      patientId: 2,
      patientName: 'Paula Rojas',
      doctorId: 11,
      doctorName: 'Dr. Ricardo López',
      date: '2025-12-05',
      time: '11:30',
      specialty: 'Medicina General',
      status: ReservationStatus.pendiente,
      reason: undefined,
    },
    {
      id: 5,
      patientId: 2,
      patientName: 'Paula Rojas',
      doctorId: 11,
      doctorName: 'Dr. Jose Luis Barros',
      date: '2025-12-09',
      time: '11:30',
      specialty: 'Medicina General',
      status: ReservationStatus.cancelada,
      reason: undefined,
    },
    {
      id: 12,
      patientId: 2,
      patientName: 'Paula Rojas',
      doctorId: 11,
      doctorName: 'Dr. Alexander Hernandez',
      date: '2025-12-03',
      time: '11:30',
      specialty: 'Dermatología',
      status: ReservationStatus.confirmada,
      reason: undefined,
    },
    {
      id: 432,
      patientId: 2,
      patientName: 'Rocío Muñoz',
      doctorId: 1,
      doctorName: 'Juan Pérez',
      date: '2025-03-07',
      time: '16:00',
      specialty: 'Cardiología',
      status: ReservationStatus.completada,
      reason: undefined,
    },
    {
      id: 76,
      patientId: 2,
      patientName: 'Paula Reyes',
      doctorId: 1,
      doctorName: 'Raul Lara',
      date: '2024-12-02',
      time: '17:00',
      specialty: 'Cardiología',
      status: ReservationStatus.completada,
      reason: undefined,
    },
    {
      id: 9987,
      patientId: 2,
      patientName: 'Gabriel Gatica',
      doctorId: 1,
      doctorName: 'Juan Pérez',
      date: '2025-11-01',
      time: '12:00',
      specialty: 'Cardiología',
      status: ReservationStatus.cancelada,
      reason: undefined,
    },
  ].sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return da - db;
  });

  private reservationSubject = new BehaviorSubject<Reservation[]>(this.reservations);
  reservation$ = this.reservationSubject.asObservable();

  private emit() {
    this.reservationSubject.next(this.reservations);
  }

  createReservation(data: Omit<Reservation, 'id' | 'status'>): Reservation {
    const nextId = this.reservations.length
      ? Math.max(...this.reservations.map((r) => r.id)) + 5430
      : 1;

    const newReservation: Reservation = {
      id: nextId,
      status: 'pendiente',
      ...data,
    };

    this.reservations = [...this.reservations, newReservation];
    this.emit();
    return newReservation;
  }

  cancelReservation(id: number): void {
    this.reservations = this.reservations.map((r) =>
      r.id === id ? { ...r, status: 'cancelada' } : r,
    );
    this.emit();
  }

  updateStatus(id: number, status: ReservationStatusType) {
    this.reservations = this.reservations.map((r) => (r.id === id ? { ...r, status } : r));
  }

  getReservationsForPatient(patientId: number): Reservation[] {
    return this.reservations.filter((r) => r.patientId === patientId);
  }

  getReservationsForDoctor(doctorId: number): Reservation[] {
    return this.reservations.filter((r) => r.doctorId === doctorId);
  }

  getReservationsForToday(doctorId: number): Reservation[] {
    const today = new Date();
    return this.reservations.filter((r) => r.doctorId === doctorId && new Date(r.date) === today);
  }
  getReservationById(id: number): Reservation | undefined {
    return this.reservations.find((r) => r.id === id);
  }

  getAllReservations() {
    return [...this.reservations];
  }
}
