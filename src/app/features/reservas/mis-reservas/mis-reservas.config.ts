export type ReservationStatus = 'confirmada' | 'pendiente' | 'cancelada' | 'completada';

export type ReservationItem = {
  id: number;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  status: ReservationStatus;
};

export const fakeReservations: ReservationItem[] = [
  {
    id: 1,
    date: '2025-12-07',
    time: '09:00',
    doctor: 'Dra. Camila Silva',
    specialty: 'Dermatología',
    status: 'confirmada',
  },
  {
    id: 2,
    date: '2025-12-09',
    time: '11:30',
    doctor: 'Dr. Ricardo López',
    specialty: 'Medicina General',
    status: 'pendiente',
  },
  {
    id: 3,
    date: '2025-11-20',
    time: '16:00',
    doctor: 'Dra. Sofía Pérez',
    specialty: 'Cardiología',
    status: 'cancelada',
  },
  {
    id: 3,
    date: '2025-11-20',
    time: '16:00',
    doctor: 'Dr. Antolín Mardones',
    specialty: 'Broncopulmonar',
    status: 'completada',
  },
];
