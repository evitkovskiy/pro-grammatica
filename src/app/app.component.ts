import { Component } from '@angular/core';
import { AuthService } from 'core/services';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor (public authService: AuthService) {

    }
}
