import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from '@angular/forms';

@Component({
  selector: 'pro-grammatica-custom-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: CustomInputComponent,
    multi: true,
  }]
})
export class CustomInputComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input() type = 'text';
  @Input() placeholder: any;
  @Input() required = false;
  @Input() disabled = false;
  @Input() pattern = '';
  @Input() minlength = 0;
  @Input() maxlength = Infinity;
  @Input() autocomplete = 'on';
  @Input() readonly = false;
  @Input() size = 20;


  focused = false;
  value = '';
  control!: AbstractControl;

  private onChangeCallback: (_: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'my-input');
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.classList.remove('my-input');
  }

  onFocus(): void {
    this.focused = true;
    this.onTouchedCallback();
  }

  onBlur(): void {
    this.focused = false;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    return null;
  }

  getError(): string {
    return this.control.hasError('required')
      ? 'Field has been required'
      : this.control.hasError('minlength')
      ? `Minimum symbol ${this.control.getError('minlength').requiredLength}`
      : this.control.hasError('maxlength')
      ? `Maximum symbol ${this.control.getError('maxlength').requiredLength}`
      : this.control.hasError('password')
      ? 'Login invalid'
      : this.control.hasError('login')
      ? 'Password Invalid'
      : this.control.hasError('url')
      ? 'Website url invalid'
      : this.control.hasError('pattern')
      ? 'Phone number Invalid'
      : this.control.hasError('max')
      ? `Maximum value ${this.control.getError('max').max}`
      : '';
  }

  getValidationClass(): string {
    const control = this.control;
    if (control.touched && control.invalid) {
      return 'ng-invalid ng-touched';
    } else if (control.touched && control.valid) {
      return 'ng-valid ng-touched';
    } else {
      return '';
    }
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    if (value.length > this.maxlength) {
      value = value.substr(0, this.maxlength);
      target.value = value;
    }

    this.writeValue(value);
    this.onChangeCallback(value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(callback: (_: any) => void): void {
    this.onChangeCallback = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouchedCallback = callback;
  }

}
