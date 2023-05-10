import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Modules
import { CustomInputModule } from './components/input/input.module';
import { MessageModule } from './components/message/message.module';
import { PreloaderModule } from './components/preloader/preloader.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CustomInputModule,
        PreloaderModule
    ],
    declarations: [
    ],
    exports: [
        CustomInputModule,
        MessageModule,
        PreloaderModule
    ]
})
export class SharedModule { }
