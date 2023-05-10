import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

//Components
import { ReportsComponent } from './pages/reports.component';


const routes: Routes = [
    { path: '', component: ReportsComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        ReportsComponent
    ]
})
export class ReportsModule { }
