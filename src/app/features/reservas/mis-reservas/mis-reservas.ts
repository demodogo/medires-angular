import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '@/app/core/models/user.model';
import { Auth } from '@/app/core/services/auth/auth';
import { Reservations } from '@/app/core/services/reservations/reservations';
import {
  Reservation,
  ReservationStatus,
  ReservationStatusType,
} from '@/app/core/services/reservations/reservations.types';

@Component({
  selector: 'app-mis-reservas',
  standalone: false,
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
})
export class MisReservas implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private subs = new Subscription();

  upcoming: Reservation[] = [];
  past: Reservation[] = [];

  constructor(
    private auth: Auth,
    private reservations: Reservations,
  ) {}

  ngOnInit() {
    this.subs.add(
      this.auth.currentUser$.subscribe((user) => {
        this.currentUser = user || null;
      }),
    );

    this.subs.add(
      this.reservations.reservation$.subscribe(() => {
        this.updateLists();
      }),
    );
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  private updateLists() {
    const today = new Date();
    let all: Reservation[] = [];
    if (this.currentUser) {
      all = this.reservations.getReservationsForPatient(this.currentUser.id);
      this.upcoming = all.filter((r) => new Date(r.date) >= today);
      this.past = all.filter((r) => new Date(r.date) < today);
      return;
    }

    this.upcoming = [];
    this.past = [];
  }

  onCancelReservation(id: number): void {
    if (!this.currentUser) return;
    this.reservations.cancelReservation(id);
    this.updateLists();
  }

  onConfirmReservation(id: number): void {
    if (!this.currentUser) return;
    this.reservations.updateStatus(id, ReservationStatus.confirmada);
    this.updateLists();
  }
  getStatusLabel(status: ReservationStatusType): string {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'pendiente':
        return 'Pendiente';
      case 'cancelada':
        return 'Cancelada';
      case 'completada':
        return 'Completada';
    }
  }

  getStatusClasses(status: ReservationStatusType): string {
    switch (status) {
      case 'confirmada':
        return 'bg-[#3469cd]/10 text-[#3469cd] border';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-600 border';
      case 'cancelada':
        return 'bg-red-100 text-red-600 border';
      case 'completada':
        return 'bg-green-100 text-green-600 border';
    }
  }
}
