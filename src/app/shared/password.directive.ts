import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { PasswordValidatorRegConfirm } from "./password.validator";

@Directive({
    selector: '[passwordConfirm]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: PasswordConfirmDirective,
            multi: true,
        },
    ],
    standalone: true
})
export class PasswordConfirmDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return PasswordValidatorRegConfirm(control);
    }
}