import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Reservation,
  ReservationStatusType,
} from '@/app/core/services/reservations/reservations.types';
import { Reservations } from '@/app/core/services/reservations/reservations';
import { User } from '@/app/core/models/user.model';
import { Subscription } from 'rxjs';
import { Auth } from '@/app/core/services/auth/auth';

@Component({
  selector: 'app-agenda',
  standalone: false,
  templateUrl: './agenda.html',
  styleUrl: './agenda.css',
})
export class Agenda implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private subs = new Subscription();
  all: Reservation[] = [];
  upcoming: Reservation[] = [];
  past: Reservation[] = [];

  constructor(
    private reservations: Reservations,
    private auth: Auth,
  ) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  private updateLists() {
    const today = new Date();
    let all: Reservation[] = [];
    if (this.currentUser) {
      all = this.reservations.getReservationsForDoctor(this.currentUser.id);
      this.upcoming = all.filter((r) => new Date(r.date) >= today);
      this.past = all.filter((r) => new Date(r.date) < today);
      return;
    }
    this.upcoming = [];
    this.past = [];
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
