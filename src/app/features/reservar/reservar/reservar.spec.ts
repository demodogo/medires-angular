import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservar } from './reservar';
import { ReactiveFormsModule } from '@angular/forms';

describe('Reservar', () => {
  let component: Reservar;
  let fixture: ComponentFixture<Reservar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Reservar],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Reservar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject past date', () => {
    const formDate = component.date;
    formDate?.setValue('2022-01-01');
    expect(formDate?.hasError('pastDate')).toBeTrue();
  });
});
