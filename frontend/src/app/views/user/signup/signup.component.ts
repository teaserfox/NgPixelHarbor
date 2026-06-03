import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {LoginResponseType} from "../../../../types/login-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    agree: [false, [Validators.requiredTrue]],
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router,) {
  }

  ngOnInit(): void {
  }


  signup(): void {
    const {email, password, name, agree} = this.signupForm.value;
    if (this.signupForm.valid && name && email && password && agree) {
      this.authService.signup(name, email, password)
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType) => {

            if ('error' in data) {
              this.snackBar.open(data.message);
              return;
              ;
            }
            console.log(data);
            if (!data.accessToken || !data.refreshToken || !data.userId) {
              this.snackBar.open('Ошибка регистрации');
              return;
            }

            this.authService.setTokens(data.accessToken, data.refreshToken);
            this.authService.userId = data.userId;


            this.userService.loadUser();


            this.snackBar.open('Успех регистрации');
            this.router.navigate(['/']);

          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error?.message) {
              this.snackBar.open(errorResponse.error.message);
            } else {
              this.snackBar.open('Ошибка регистрации');
            }
          }
        })
    }
  }

}
