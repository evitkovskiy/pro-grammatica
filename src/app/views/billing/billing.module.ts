import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

// Components
import { BillingComponent } from './pages/billing.component'


const routes: Routes = [
    { path: '', component: BillingComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [

    ]
})
export class BillingModule { }
