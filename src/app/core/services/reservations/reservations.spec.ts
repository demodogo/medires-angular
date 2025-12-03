import { TestBed } from '@angular/core/testing';

import { Reservations } from './reservations';
import { ReservationStatus } from '@/app/core/services/reservations/reservations.types';

describe('Reservations', () => {
  let service: Reservations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reservations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should cancel reservation', () => {
    const all = service.getAllReservations();
    const targetRes = all[0];
    service.cancelReservation(targetRes.id);
    const updatedRes = service.getAllReservations().find((r) => r.id === targetRes.id);
    expect(updatedRes?.status).toBe(ReservationStatus.cancelada);
  });
});
