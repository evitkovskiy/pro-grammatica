import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { SharedModule } from 'shared'
import { HeaderComponent } from './header.component'
import { RouterModule } from '@angular/router'
import { DirectivesModule } from 'shared/directives/directives.module'


@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ],
    declarations: [
        HeaderComponent,
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }
