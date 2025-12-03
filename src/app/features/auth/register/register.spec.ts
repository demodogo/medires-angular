import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { ReactiveFormsModule } from '@angular/forms';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Register],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate password strength', () => {
    const password = component.password;
    password?.setValue('invPass');
    expect(password?.hasError('invalidPassword')).toBeTrue();
  });
});
