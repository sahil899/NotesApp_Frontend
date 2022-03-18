import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordCheckerValidator(): ValidatorFn {
    return (Control: AbstractControl): ValidationErrors | null => {
        const password = Control.parent?.get('password')!.value;
        if (password == null || Control.value.length == null)
            return null;
        return (Control.value === password) ? null : { mismatch: { value: true } };
    }
}