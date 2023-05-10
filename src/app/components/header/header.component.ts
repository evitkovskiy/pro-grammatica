import { Component, OnDestroy, OnInit, Optional, SkipSelf, ViewChild } from '@angular/core';

//RxJS
import { Observable } from 'rxjs'
import { takeUntil, tap, map, switchMap } from 'rxjs/operators';

// Services
import { MessageService } from '../../../shared/services';
import { AuthService } from '../../../core/services';
import { ProfilePageService } from 'app/views/profile/services/profile-page.service';

// Directives
import { RefDirective } from '../../../shared/directives/ref.directive';

// Classes
import { Watcher } from '../../../shared/classes/watcher';

// Interfaces
import { IProfile } from 'app/views/profile/entities/interfaces/profile.interface';

@Component({
  selector: 'pro-grammatica-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
//   changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends Watcher implements OnInit, OnDestroy {

    @ViewChild(RefDirective, {static: false}) refDir!: RefDirective;

    currentUser$ = new Observable()

    constructor(
        @Optional() @SkipSelf() public authService: AuthService,
        @Optional() @SkipSelf() private profilePageService: ProfilePageService,
        @Optional() @SkipSelf() private messageService: MessageService
     ) {
        super()
     }

    ngOnInit(): void {
      this.currentUser$ = this.profilePageService.currentProfileLogin.pipe(
            switchMap(() => this.profilePageService.getProfile()),
            map((profile: IProfile) => `${profile.firstName} ${profile.lastName}`)
      );

      this.messageService.message
        .pipe(
            takeUntil(this.unsubscribe),
            tap(message => this.messageService.showMessage(this.refDir, message))
        )
        .subscribe();
    }

    logout(): void {
      this.authService.logout();
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
