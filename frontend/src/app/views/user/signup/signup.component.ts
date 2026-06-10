import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {LoginResponseType} from "../../../../types/login-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../shared/services/user.service";
import {FormErrorsHelper} from "../../../shared/helpers/form-errors.helper";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    agree: [false, [Validators.requiredTrue]],
  });

  activeField: 'name' | 'email' | 'password' | null = null;
  showAgreeHint = false;
  agreeHintTimer: any;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router,) {
  }

  ngOnInit(): void {

    this.signupForm.get('password')?.valueChanges
      .subscribe(() => {
        const readyForAgreement =
          this.signupForm.get('name')?.valid &&
          this.signupForm.get('email')?.valid &&
          this.signupForm.get('password')?.valid &&
          this.signupForm.get('agree')?.value !== true;

        if (readyForAgreement) {
          this.agreeHintTimer = setTimeout(() => {

            const agree = this.signupForm.get('agree')?.value;

            if (!agree) {
              this.showAgreeHint = true;
            }
          }, 2000);
        }
      });
    this.signupForm.get('agree')?.valueChanges.subscribe(value => {
      clearTimeout(this.agreeHintTimer);

      if (value) {
        this.showAgreeHint = false;
      }
    });
  }

  getError(field: string): string {
    return FormErrorsHelper.getError(
      this.signupForm.get(field),
      field
    );
  }

  // getNameError(): string {
  //   const control = this.signupForm.get('name');
  //
  //   if (control?.hasError('required')) {
  //     return 'Пожалуйста, укажите ваше имя';
  //   }
  //
  //   return '';
  // }
  //
  // getEmailError(): string {
  //   const control = this.signupForm.get('email');
  //
  //   if (control?.hasError('required')) {
  //     return 'Введите адрес электронной почты';
  //   }
  //
  //   if (control?.hasError('email')) {
  //     return 'Похоже, в адресе электронной почты есть неточность';
  //   }
  //
  //   return '';
  // }
  //
  // getPasswordError(): string {
  //   const control = this.signupForm.get('password');
  //
  //   if (control?.hasError('required')) {
  //     return 'Придумайте пароль для вашего аккаунта';
  //   }
  //
  //   if (control?.hasError('pattern')) {
  //     return 'Пароль должен содержать минимум 8 символов, заглавную и строчную букву';
  //   }
  //
  //   return '';
  // }

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
              this.snackBar.open('Не удалось завершить регистрацию. Попробуйте ещё раз немного позже.');
              return;
            }

            this.authService.setTokens(data.accessToken, data.refreshToken);
            this.authService.userId = data.userId;


            this.userService.loadUser();


            this.snackBar.open('Добро пожаловать! Ваш аккаунт успешно создан.');
            this.router.navigate(['/']);

          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error?.message) {
              this.snackBar.open(errorResponse.error.message);
            } else {
              this.snackBar.open('Не удалось завершить регистрацию. Попробуйте ещё раз немного позже.');
            }
          }
        })
    }
  }

}
