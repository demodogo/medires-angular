import { Component, Input } from '@angular/core';
import { DashboardCardType } from '@/app/features/dashboard/dashboard.config';

@Component({
  selector: 'app-dashboard-card',
  standalone: false,
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css',
})
export class DashboardCard {
  @Input() card!: DashboardCardType;
}
