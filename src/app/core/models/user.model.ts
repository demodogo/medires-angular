export type Role = 'admin' | 'patient';

export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}
