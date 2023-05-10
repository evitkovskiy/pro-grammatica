import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from 'shared'

// Components
import { ProfileComponent } from './pages/profile.component';
import { DirectivesModule } from 'shared/directives/directives.module'


const routes: Routes = [
    { path: '', component: ProfileComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule
    ],
    declarations: [
        ProfileComponent,
    ]
})
export class ProfileModule { }
