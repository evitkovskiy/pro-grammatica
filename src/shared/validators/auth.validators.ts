import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export const loginRegExp: RegExp = /^[a-zA-Z0-9_-]{3,16}$/;

export const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


export const loginValidators = [
    Validators.required,
    loginValidtor()
]

export const passwordValidators = [
    Validators.required,
    passwordValidator()
]

function loginValidtor(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        return loginRegExp.test(control.value) ? null : {login: true}
    };
}

function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        return passwordRegex.test(control.value) ? null : {password: true}
    };
}


