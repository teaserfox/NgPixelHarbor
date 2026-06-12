import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../core/auth/auth.service";
import {UserInfoType} from "../../../types/user-info.type";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userSubject = new BehaviorSubject<UserInfoType | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  getUserInfo(): Observable<UserInfoType> {
    const token = localStorage.getItem('accessToken');
    return this.http.get<UserInfoType>(environment.api + 'users', {
      headers: {
        'x-auth': token || ''
      }
    });
  }

  loadUser(): void {

    const token = localStorage.getItem('accessToken');

    if (!token) {
      return;
    }

    this.getUserInfo()
      .subscribe({
        next: (user) => {
          this.userSubject.next(user);
        },
        error: (err) => {
          console.log('USER ERROR:', err);
          this.userSubject.next(null);
        }
      });
  }

  clearUser(): void {
    this.userSubject.next(null);
  }
}
