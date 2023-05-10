import { Directive, ElementRef, HostListener, NgZone } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[phoneNumberMask]',
})
export class PhoneNumberMaskDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef, private control: NgControl, private zone: NgZone) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    if (this.control.name === 'phoneNumber') {
      this.zone.runOutsideAngular(() => {
        let val = event.target.value.replace(/\D/g, '');
        const formattedVal = this.formatPhoneNumber(val);

        if (formattedVal !== this.previousValue) {
          this.previousValue = formattedVal;
          this.updateControlValue(formattedVal);
        }
      });
    }
  }

  private formatPhoneNumber(val: string): string {
    const countryCode = '+7';
    const firstPart = val.substr(0, 3);
    const secondPart = val.substr(3, 3);
    const thirdPart = val.substr(6, 4);

    if (val.length <= 3) {
      return `${countryCode}(${firstPart})`;
    } else if (val.length <= 6) {
      return `${countryCode}(${firstPart}) ${secondPart}`;
    }
    return `${countryCode}(${firstPart}) ${secondPart}-${thirdPart}`;
  }

  private updateControlValue(val: string): void {
    this.zone.runTask(() => {
      this.control.control?.setValue(val, { emitEvent: false });
    });
  }
}
