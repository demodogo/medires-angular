import { Injectable } from '@angular/core';
import { Role, User } from '@/app/core/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly STORAGE_KEY = 'currentUser';

  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUser());

  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  private loadUser(): User | null {
    const userString = localStorage.getItem(this.STORAGE_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  private saveUserToLS(user: User | null): void {
    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  login(email: string, password: string): boolean {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Juan',
        lastName: 'Perez',
        email: 'admin@email.cl',
        password: 'admin123',
        role: 'admin',
      },
      {
        id: 2,
        name: 'Paula',
        lastName: 'Rojas',
        email: 'projas@gmail.com',
        password: 'projas123',
        role: 'patient',
      },
    ];

    const found = mockUsers.find((u) => u.email === email && u.password === password);

    if (!found) return false;
    this.currentUserSubject.next(found);
    this.saveUserToLS(found);
    return true;
  }

  register(user: Omit<User, 'id' | 'role'>, role: Role = 'patient'): User {
    const nextId = Math.floor(Math.random() * 1000000);
    const newUser = { ...user, id: nextId, role };
    this.currentUserSubject.next(newUser);
    this.saveUserToLS(newUser);
    return newUser;
  }

  updateCurrentUser(updatedUser: User): void {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) return;

    const updated = { ...currentUser, ...updatedUser };
    this.currentUserSubject.next(updated);
    this.saveUserToLS(updated);
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.saveUserToLS(null);
  }

  hasRole(role: Role): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.role === role;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
