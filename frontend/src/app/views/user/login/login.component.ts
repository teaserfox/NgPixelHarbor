import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {LoginResponseType} from "../../../../types/login-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {FormErrorsHelper} from "../../../shared/helpers/form-errors.helper";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  })

  activeField: 'email' | 'password' | null = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router,) {
  }

  ngOnInit(): void {
  }

  getError(field: string): string {
    return FormErrorsHelper.getError(
      this.loginForm.get(field),
      field === 'password' ? 'loginPassword' : field
    );
  }


  login(): void {
    const {email, password, rememberMe} = this.loginForm.value;
    if (this.loginForm.valid && email && password) {
      this.authService.login(email, password, !!rememberMe)
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType) => {

            if ('error' in data) {
              this.snackBar.open(data.message);
              return;
              ;
            }
            if (!data.accessToken || !data.refreshToken || !data.userId) {
              this.snackBar.open('Ошибка авторизации');
              return;
            }

            this.authService.setTokens(data.accessToken, data.refreshToken);
            this.authService.userId = data.userId;

            this.userService.loadUser();

            this.snackBar.open('Успех авторизации');
            this.router.navigate(['/']);

          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error?.message) {
              this.snackBar.open(errorResponse.error.message);
            } else {
              this.snackBar.open('Ошибка авторизации');
            }
          }
        })
    }
  }
}
