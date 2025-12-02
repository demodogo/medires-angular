export type SpecialtyOption = {
  id: string;
  name: string;
  doctors: string[];
};

export const SPECIALTIES: SpecialtyOption[] = [
  {
    id: 'cardio',
    name: 'Cardiología',
    doctors: ['Sofía Pérez', 'Carlos Muñoz', 'Andrea Torres', 'Jorge Riquelme'],
  },
  {
    id: 'medgen',
    name: 'Medicina General',
    doctors: ['Ricardo López', 'Paula Herrera', 'Matías Fuentes', 'Valeria Castillo'],
  },
  {
    id: 'derma',
    name: 'Dermatología',
    doctors: ['Camila Silva', 'Sebastián Vera', 'Francisca Reyes'],
  },
  {
    id: 'pediatria',
    name: 'Pediatría',
    doctors: ['Dr. Alejandro Soto', 'Dra. Javiera Morales', 'Dr. Pablo Acuña'],
  },
  {
    id: 'oftalmo',
    name: 'Oftalmología',
    doctors: ['Dra. Carolina Pizarro', 'Dr. Daniel Herrera'],
  },
];
