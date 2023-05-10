import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// Components
import { InventoryComponent } from './pages/inventory.component';


const routes: Routes = [
    { path: '', component: InventoryComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        InventoryComponent
    ]
})
export class InventoryModule { }
