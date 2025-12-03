import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pacientes } from './pacientes';
import { ReactiveFormsModule } from '@angular/forms';

describe('Pacientes', () => {
  let component: Pacientes;
  let fixture: ComponentFixture<Pacientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pacientes],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Pacientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
