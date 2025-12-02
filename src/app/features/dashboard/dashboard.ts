import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@/app/core/models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Auth } from '@/app/core/services/auth/auth';
import {
  AppointmentStatusVariant,
  dashboardConfig,
} from '@/app/features/dashboard/dashboard.config';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private sub?: Subscription;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sub = this.auth.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get config() {
    if (!this.currentUser) return null;
    return dashboardConfig[this.currentUser.role];
  }

  private statusClasses: Record<AppointmentStatusVariant, string> = {
    success: 'text-green-600 bg-green-200 border',
    info: 'text-blue-600 bg-blue-200 border',
    warning: 'text-yellow-600 bg-yellow-200 border',
    danger: 'text-red-600 bg-red-200 border',
  };

  getStatusClass(variant: AppointmentStatusVariant): string {
    return this.statusClasses[variant] ?? this.statusClasses.info;
  }
}
