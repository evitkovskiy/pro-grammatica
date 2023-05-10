import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export const urlRegex = new RegExp(/^https?:\/\/(?:www\.)?[\w.-]+\.[a-zA-Z]{2,20}(?:\/.*)*$/);
export const phoneNumber = new RegExp(/^\+7\d{9}$/);

export const emailValidators = [
    Validators.required
]

export const firstNameValidatos = [
    Validators.required,
    Validators.maxLength(255)
]

export const lastNameValidatos = [
    Validators.required,
    Validators.maxLength(255)
]

export const phoneNumberValidators = [
    Validators.required,
    Validators.pattern(phoneNumber)
]

export const websiteUrlValidators = [
    websiteUrlValidator()
]

function websiteUrlValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
       return urlRegex.test(control.value) ? null : {url: true}
    };
}

