export type ReservationStatusType = 'confirmada' | 'pendiente' | 'cancelada' | 'completada';

export const ReservationStatus = {
  confirmada: 'confirmada',
  pendiente: 'pendiente',
  cancelada: 'cancelada',
  completada: 'completada',
} as const;

export const ReservationStatusList: ReservationStatusType[] = [
  ReservationStatus.confirmada,
  ReservationStatus.pendiente,
  ReservationStatus.cancelada,
  ReservationStatus.completada,
];

export type Reservation = {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: ReservationStatusType;
  reason: string | undefined;
};
