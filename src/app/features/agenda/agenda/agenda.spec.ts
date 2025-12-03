import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Agenda } from './agenda';
import { ReactiveFormsModule } from '@angular/forms';

describe('Agenda', () => {
  let component: Agenda;
  let fixture: ComponentFixture<Agenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Agenda],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Agenda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
