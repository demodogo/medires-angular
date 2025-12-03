import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCard } from './dashboard-card';

describe('DashboardCard', () => {
  let component: DashboardCard;
  let fixture: ComponentFixture<DashboardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardCard);
    component = fixture.componentInstance;
    component.card = {
      title: 'Test Title',
      value: 'Test Value',
      description: 'Test Description',
    };
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
