import { AbstractControl, ValidationErrors } from '@angular/forms';

export function rutValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.replace(/\./g, '')?.replace(/-/g, '')?.toUpperCase();

  if (!value) return null;

  const rutRegex = /^[0-9]+[0-9K]$/;

  if (!rutRegex.test(value)) {
    return { invalidRut: true };
  }

  if (value.length < 8 || value.length > 10) {
    return { invalidRut: true };
  }

  return null;
}
