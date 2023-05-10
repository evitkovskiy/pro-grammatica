import { ChangeDetectionStrategy, Component, Optional, SkipSelf, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// RxJS
import { EMPTY } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators'

// Services
import { MessageService, PreloaderService } from 'shared/services';
import { ProfilePageService } from 'app/views/profile/services/profile-page.service';
import { AuthService } from 'core/services';

// Classes
import { Watcher } from 'shared/classes/watcher';

// Entities
import { LoginForm, LoginResponse  } from 'auth/entities';

// Global
import { LOGIN_FORM_CONTROLS } from 'global';

// Functions
import { trackItem } from 'shared/functions/functions';

// Directives
import { RefDirective } from 'shared/directives/ref.directive';


@Component({
  selector: 'pro-grammatica-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends Watcher {

  @ViewChild(RefDirective, {static: false}) refDir!: RefDirective;

  loginForm!: FormGroup;
  loginFormControls = LOGIN_FORM_CONTROLS;
  trackItem = trackItem;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Optional() @SkipSelf() private authService: AuthService,
    @Optional() @SkipSelf() private profilePageService: ProfilePageService,
    @Optional() @SkipSelf() private messageService: MessageService,
    @Optional() @SkipSelf() private preoloaderService: PreloaderService
   ) {
    super();
    this.loginForm = this.fb.group(new LoginForm)
  }

  login(): void {
    const {login, password} = this.loginForm.getRawValue();
    this.preoloaderService.show(this.refDir);
    this.authService.login(login, password).pipe(
        switchMap((response: LoginResponse) => {
          this.messageService.message.next(response);
          this.profilePageService.currentProfileLogin.next(login)
          this.authService.setRole(response.role as string);
          this.preoloaderService.hide(this.refDir);
          return this.router.navigate(['/home']);
        }),
        catchError((error: LoginResponse) => {
          this.messageService.message.next(error);
          this.preoloaderService.hide(this.refDir);
          return EMPTY;
        }),
        takeUntil(this.unsubscribe)
      ).subscribe();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy()
  }


}
