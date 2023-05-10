import { AfterViewInit, Component, OnDestroy, OnInit, Optional, SkipSelf, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// RxJS
import { NEVER, Observable } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, startWith, switchMap, catchError } from 'rxjs/operators';

// Form
import { ProfileForm } from '../entities/form/profile.form';

// Classes
import { Watcher } from 'shared/classes/watcher';

// Global
import { PROFILE_FORM_CONTROLS } from 'global';

// Functions
import { trackItem } from 'shared/functions/functions';

// Services
import { ProfilePageService } from '../services/profile-page.service';
import { MessageService } from 'shared/services/message.service';
import { PreloaderService } from 'shared/services/preloader.service';

// Directives
import { RefDirective } from 'shared/directives/ref.directive';

// Interfaces
import { IProfile, IUpdateProfileResponse } from '../entities/interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent extends Watcher implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(RefDirective, {static: false}) refDir!: RefDirective;

  profileForm!: FormGroup;
  profile!: IProfile;
  isSameProfiles$ = new Observable();

  trackItem = trackItem;
  profileFormControls = PROFILE_FORM_CONTROLS;


  constructor(
    private fb: FormBuilder,
    @Optional() @SkipSelf() private profilePageService: ProfilePageService,
    @Optional() @SkipSelf() private messageService: MessageService,
    @Optional() @SkipSelf() private preloaderService: PreloaderService
  ) {
    super();
    this.profileForm = this.fb.group(new ProfileForm);
  }

  ngOnInit(): void {
    this.isSameProfiles$ = this.profileForm.valueChanges
        .pipe(
            distinctUntilChanged(),
            map((value: IProfile) => JSON.stringify(this.profile) === JSON.stringify(value)),
            startWith(true)
        )
  }

  ngAfterViewInit(): void {
    this.showPreloader();
    this.getProfile();
  }

  onSubmit(): void {
    this.showPreloader();
    const profile: IProfile = this.profileForm.getRawValue();
    this.profilePageService.updateProfile(profile)
    .pipe(
        takeUntil(this.unsubscribe),
        switchMap((response: IUpdateProfileResponse) => {
            this.getProfile();
            this.messageService.message.next(response);
            this.hidePreloader();
            return NEVER;
        }
        ),
        catchError((error: IUpdateProfileResponse) => {
            this.preloaderService.hide(this.refDir);
            this.messageService.message.next(error);
            return NEVER;
        }),
        )
    .subscribe()

  }

  private getProfile(): void {
    this.profilePageService.getProfile()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((profile: IProfile) => {
        this.profile = profile;
        this.profileForm.patchValue(this.profile);
        this.hidePreloader();
    });
  }

  private showPreloader(): void {
    this.preloaderService.show(this.refDir);
  }

  private hidePreloader(): void {
    this.preloaderService.hide(this.refDir);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
