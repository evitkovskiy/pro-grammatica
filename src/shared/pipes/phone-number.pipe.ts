import { Pipe, PipeTransform } from '@angular/core';
import { NgControl } from '@angular/forms';

@Pipe({
  name: 'phoneMask'
})
export class PhoneMaskPipe implements PipeTransform {

  constructor(control: NgControl) {}

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const digitsOnly = value.replace(/\D/g, ''); // удаляем все символы, кроме цифр
    const length = digitsOnly.length;
    if (length < 4) {
      return `+7 (${digitsOnly}`; // добавляем префикс
    }
    if (length < 7) {
      return `+7 (${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`; // добавляем пробелы
    }
    return `+7 (${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`; // добавляем дефис
  }
}
