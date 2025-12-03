import { TestBed } from '@angular/core/testing';

import { roleGuard } from './role-guard';
import { Role } from '@/app/core/models/user.model';

describe('roleGuard', () => {
  const executeGuard = (arg: Role) => TestBed.runInInjectionContext(() => roleGuard(arg));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
