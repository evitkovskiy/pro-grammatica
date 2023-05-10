import { AbstractControl, ValidationErrors } from '@angular/forms';

import {
  emailValidators,
  firstNameValidatos,
  lastNameValidatos,
  phoneNumberValidators,
  websiteUrlValidators
} from '../../../../../shared/validators/profile.validators';

export class ProfileForm {
  email: (string | ((control: AbstractControl) => ValidationErrors)[])[];
  firstName: (string | ((control: AbstractControl) => ValidationErrors)[])[];
  lastName: (string | ((control: AbstractControl) => ValidationErrors)[])[];
  phoneNumber: (string | ((control: AbstractControl) => ValidationErrors)[])[];
  websiteUrl: (string | ((control: AbstractControl) => ValidationErrors)[])[];


  constructor() {
    this.email = ['', emailValidators as ((control: AbstractControl) => ValidationErrors)[]];
    this.firstName = ['', firstNameValidatos as ((control: AbstractControl) => ValidationErrors)[]];
    this.lastName = ['', lastNameValidatos as ((control: AbstractControl) => ValidationErrors)[]];
    this.phoneNumber = ['', phoneNumberValidators as ((control: AbstractControl) => ValidationErrors)[]];
    this.websiteUrl = ['', websiteUrlValidators as ((control: AbstractControl) => ValidationErrors)[]];
  }
}
