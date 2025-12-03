import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile } from './profile';
import { ReactiveFormsModule } from '@angular/forms';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Profile],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email format', () => {
    const email = component.email;
    email?.setValue('email-invalido');
    expect(email?.hasError('email')).toBeTrue();
  });
});
