import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Components
import { CustomInputComponent } from './input.component'

// Directives
import { PhoneNumberMaskDirective } from 'shared/directives/phone-number.directive'


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CustomInputComponent,
        PhoneNumberMaskDirective,
    ],
    exports: [
        CustomInputComponent
    ]
})
export class CustomInputModule { }
