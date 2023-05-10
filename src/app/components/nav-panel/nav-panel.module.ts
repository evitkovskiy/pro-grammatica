import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { SharedModule } from 'shared'
import { NavPanelComponent } from './nav-panel.component'
import { RouterModule } from '@angular/router'


@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        NavPanelComponent
    ],
    exports: [
        NavPanelComponent
    ]
})
export class NavPanelModule { }
