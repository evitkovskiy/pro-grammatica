import { Injectable } from '@angular/core';

// RxJS
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { delay, shareReplay, switchMap } from 'rxjs/operators';

// Interfaces
import { IProfile, IUpdateProfileResponse } from '../entities/interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {

  currentProfileLogin = new BehaviorSubject('');

  private profile: IProfile = {
    email: 'jeny.vitkovsiy@gmail.com',
    firstName: 'Yauhen',
    lastName: 'Vitkouski',
    phoneNumber: '+7455493495',
    websiteUrl: 'https://example.com'
  };

  getProfile(): Observable<IProfile> {
    return of(this.profile).pipe(delay(2000), shareReplay(1));
  }

  updateProfile(profile: IProfile): Observable<IUpdateProfileResponse> {
    if(profile.firstName.length > 2) {
        this.profile.firstName = profile.firstName;
        this.profile.lastName = profile.lastName;
        this.profile.websiteUrl = profile.websiteUrl;
        this.profile.phoneNumber = profile.phoneNumber;
        return of({
            success: true,
            message: 'Profile has been updated'
        }).pipe(delay(2000));
    }
    else {
        return timer(2000).pipe(
            switchMap(_ => {
              return throwError({
                success: false,
                message: 'Profile has not been updated',
              });
            })
          );
    }

  }
}
