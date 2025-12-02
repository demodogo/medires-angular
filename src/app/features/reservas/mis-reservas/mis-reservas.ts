import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  fakeReservations,
  ReservationItem,
  ReservationStatus,
} from '@/app/features/reservas/mis-reservas/mis-reservas.config';
import { User } from '@/app/core/models/user.model';
import { Auth } from '@/app/core/services/auth/auth';

@Component({
  selector: 'app-mis-reservas',
  standalone: false,
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
})
export class MisReservas implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private sub?: Subscription;

  upcoming: ReservationItem[] = [];
  past: ReservationItem[] = [];

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.sub = this.auth.currentUser$.subscribe((user) => {
      this.currentUser = user || null;

      if (user) {
        const today = new Date();

        this.upcoming = fakeReservations.filter((r) => new Date(r.date) >= today);
        this.past = fakeReservations.filter((r) => new Date(r.date) < today);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getStatusLabel(status: ReservationStatus): string {
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

  getStatusClasses(status: ReservationStatus): string {
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
