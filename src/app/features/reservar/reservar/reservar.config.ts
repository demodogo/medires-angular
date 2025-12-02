export type DoctorType = {
  id: number;
  name: string;
};

export type SpecialtyOption = {
  id: string;
  name: string;
  doctors: DoctorType[];
};

export const SPECIALTIES: SpecialtyOption[] = [
  {
    id: 'cardio',
    name: 'Cardiología',
    doctors: [
      {
        id: 1,
        name: 'Sofía Pérez',
      },
      {
        id: 2,
        name: 'Carlos Muñoz',
      },
      {
        id: 3,
        name: 'Andrea Torres',
      },
      {
        id: 4,
        name: 'Jorge Riquelme',
      },
    ],
  },
  {
    id: 'medgen',
    name: 'Medicina General',
    doctors: [
      {
        id: 5,
        name: 'Ricardo López',
      },
      {
        id: 6,
        name: 'Paula Herrera',
      },
      {
        id: 7,
        name: 'Matías Fuentes',
      },
      {
        id: 8,
        name: 'Valeria Castillo',
      },
    ],
  },
  {
    id: 'derma',
    name: 'Dermatología',
    doctors: [
      {
        id: 9,
        name: 'Camila Silva',
      },
      {
        id: 10,
        name: 'Sebastián Vera',
      },
      {
        id: 11,
        name: 'Francisca Reyes',
      },
    ],
  },
  {
    id: 'pediatria',
    name: 'Pediatría',
    doctors: [
      {
        id: 12,
        name: 'Alejandro Soto',
      },
      {
        id: 13,
        name: 'Javiera Morales',
      },
      {
        id: 14,
        name: 'Pablo Acuña',
      },
    ],
  },
  {
    id: 'oftalmo',
    name: 'Oftalmología',
    doctors: [
      {
        id: 15,
        name: 'Carolina Pizarro',
      },
      {
        id: 16,
        name: 'Daniel Herrera',
      },
    ],
  },
];
