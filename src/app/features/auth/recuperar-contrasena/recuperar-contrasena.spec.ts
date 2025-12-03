import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContrasena } from './recuperar-contrasena';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecuperarContrasena', () => {
  let component: RecuperarContrasena;
  let fixture: ComponentFixture<RecuperarContrasena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarContrasena],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasena);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
