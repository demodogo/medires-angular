import { Role } from '@/app/core/models/user.model';

export type AppointmentStatusVariant = 'success' | 'info' | 'warning' | 'danger';

type AppointmentItem = {
  time: string;
  name: string;
  description: string;
  statusLabel: string;
  statusVariant: AppointmentStatusVariant;
};

export type ActionVariant = 'primary' | 'outline';

type DashboardAction = {
  label: string;
  route: string;
  variant: ActionVariant;
};

export const dashboardConfig: Record<
  Role,
  {
    subtitle: string;
    welcome: string;
    cards: Array<{
      title: string;
      value: string | number;
      description: string;
    }>;
    appointmentsTitle: string;
    appointmentsLabel: string;
    appointments: AppointmentItem[];
    actions: DashboardAction[];
  }
> = {
  admin: {
    subtitle: 'Revisa tus próximas atenciones, pacientes y el resumen de tu jornada.',
    welcome: 'Bienvenid@ al panel de MediReserva',
    cards: [
      {
        title: 'Atenciones de hoy',
        value: 18,
        description: 'Pendientes del día: 3',
      },
      {
        title: 'Pacientes nuevos',
        value: 2,
        description: 'Ingresados hoy',
      },
      {
        title: 'Confirmadas',
        value: '6 / 8',
        description: '2 pendientes de confirmación',
      },
    ],
    appointmentsTitle: 'Próximas reservas',
    appointmentsLabel: 'Hoy',
    appointments: [
      {
        time: '09:00',
        name: 'Rocío Gatica',
        description: 'Consulta General',
        statusLabel: 'Confirmada',
        statusVariant: 'success',
      },
      {
        time: '10:30',
        name: 'Steffi Ryser',
        description: 'Control crónico',
        statusLabel: 'Por confirmar',
        statusVariant: 'warning',
      },
      {
        time: '12:00',
        name: 'Alejandro Peñailillo',
        description: 'Control crónico',
        statusLabel: 'Confirmada',
        statusVariant: 'success',
      },
      {
        time: '17:00',
        name: 'Michelle Rodríguez',
        description: 'Control crónico',
        statusLabel: 'Cancelada',
        statusVariant: 'danger',
      },
    ],
    actions: [
      {
        label: 'Ver agenda completa',
        route: '/admin/agenda',
        variant: 'primary',
      },
      {
        label: 'Mis pacientes',
        route: '/admin/pacientes',
        variant: 'outline',
      },
      {
        label: 'Configuración',
        route: '/configuracion',
        variant: 'outline',
      },
    ],
  },
  patient: {
    subtitle: 'Revisa tus próximas reservas y controla tu historial clínico.',
    welcome: 'Tu panel personal de paciente',
    cards: [
      {
        title: 'Próxima reserva',
        value: '09:00 AM',
        description: 'Consulta general con Dr. Lara',
      },
      {
        title: 'Reservas activas',
        value: 2,
        description: 'Tienes 2 reservas futuras',
      },
    ],
    appointmentsTitle: 'Próximas reservas',
    appointmentsLabel: 'Hoy',
    appointments: [
      {
        time: '09:00',
        name: 'Dr. Tomás Lara (Consulta general)',
        description: 'Centro Médico Las Condes',
        statusLabel: 'Confirmada',
        statusVariant: 'success',
      },
      {
        time: '14:00',
        name: 'Dr. Mariano Leal (Oftalmología)',
        description: 'Centro Médico Vitacura',
        statusLabel: 'Debes confirmar tu hora',
        statusVariant: 'warning',
      },
    ],
    actions: [
      {
        label: 'Nueva reserva',
        route: '/reservar',
        variant: 'primary',
      },
      {
        label: 'Ver mis reservas',
        route: '/mis-reservas',
        variant: 'outline',
      },
      {
        label: 'Configuración',
        route: '/configuracion',
        variant: 'outline',
      },
    ],
  },
};
