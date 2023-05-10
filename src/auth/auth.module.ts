import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from 'core/core.module';

// Components
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'shared';
import { CommonModule } from '@angular/common';
import { RefDirective } from 'shared/directives/ref.directive';
import { DirectivesModule } from 'shared/directives/directives.module';


const routes: Routes = [
    {
      path: '',
      component: LoginComponent
    }
  ];


@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        DirectivesModule
    ],
    exports: [
        RouterModule
    ]
})
export class AuthModule { }
