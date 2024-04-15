import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const PasswordValidatorRegConfirm: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value
    ? { notMatchingRegConfirm: true }
    : null;
};

export const PasswordValidatorRegNew: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const newPassword = control.get('newPassword');
    if (password?.pristine || newPassword?.pristine) {
      return null;
    }
    return password && newPassword && password.value === newPassword.value
      ? { matchingRegNew: true }
      : null;
  };

  export const PasswordValidatorConfirmNew: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const confirmPassword = control.get('confirmPassword');
    const newPassword = control.get('newPassword');
    if (confirmPassword?.pristine || newPassword?.pristine) {
      return null;
    }
    return confirmPassword && newPassword && confirmPassword.value === newPassword.value
      ? { matchingConfirmNew: true }
      : null;
  };

