import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { UserService } from '../services/user.service';

export function PasswordValidatorOldConfirm(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  return password &&
    confirmPassword &&
    password.value !== confirmPassword.value
    ? { notMatchingOldConfirm: true }
    : null;
}

export function PasswordValidatorOldNew(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const newPassword = control.get('newPassword');
  if (password?.pristine || newPassword?.pristine) {
    return null;
  }
  return password && newPassword && password.value === newPassword.value
    ? { matchingOldNew: true }
    : null;
}

export function PasswordValidatorConfirmNew(
  control: AbstractControl
): ValidationErrors | null {
  const confirmPassword = control.get('confirmPassword');
  const newPassword = control.get('newPassword');
  if (confirmPassword?.pristine || newPassword?.pristine) {
    return null;
  }
  return confirmPassword &&
    newPassword &&
    confirmPassword.value === newPassword.value
    ? { matchingConfirmNew: true }
    : null;
}

// export function PasswordValidatorOldValid(
//   control: AbstractControl,
//   userService: UserService
// ): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const oldPassword = control.get('oldPassword');
//     const validPassword = userService.getUser()?.password;
//     if (oldPassword?.pristine) {
//       return null;
//     }
//     return oldPassword && oldPassword.value !== validPassword
//       ? { notMatchingOldValid: true }
//       : null;
//   };
// }

// export function PasswordValidatorConfirmValid(
//   control: AbstractControl,
//   userService: UserService
// ): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const confirmPassword = control.get('confirmPassword');
//     const validPassword = userService.getUser()?.password;
//     console.log(validPassword);
//     if (confirmPassword?.pristine) {
//       return null;
//     }
//     return confirmPassword && confirmPassword.value !== validPassword
//       ? { notMatchingConfirmValid: true }
//       : null;
//   };
// }
