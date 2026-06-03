import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SuccessPopupComponent} from "../success-popup/success-popup.component";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, this.phoneValidator]],
    service: ['']
  });

  constructor(private dialogRef: MatDialogRef<OrderPopupComponent>,
              private fb: FormBuilder,
              private requestService: RequestService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data?.preselectedService) {
      this.form.patchValue({
        service: this.data.preselectedService
      });
    }
  }

  phoneValidator(control: AbstractControl) {

    if (!control.value) {
      return null;
    }

    const phone = control.value
      .replace(/\D/g, '');

    return phone.length === 11
      ? null
      : {invalidPhone: true};
  }

  sendOrder() {

    this.form.markAllAsTouched();

    if (this.form.get('name')?.hasError('required')) {
      this.snackBar.open('Введите имя');
      return;
    }

    if (this.form.get('phone')?.hasError('required')) {
      this.snackBar.open('Введите телефон');
      return;
    }

    if (this.form.get('phone')?.hasError('invalidPhone')) {
      this.snackBar.open('Ошибка ввода номера телефона');
      return;
    }

    const requestData: any = {
      name: this.form.value.name!,
      phone: this.form.value.phone!
    };

    if (this.data?.service) {
      requestData.type = 'order';
      requestData.service = this.data.service;
    } else {
      requestData.type = 'consultation';
      requestData.service = this.form.value.service;
    }

    this.requestService.createRequest(requestData)
      .subscribe({
        next: () => {

          this.dialog.closeAll();

          this.dialog.open(SuccessPopupComponent, {
            panelClass: 'custom-popup',
            autoFocus: false
          });

          this.form.reset();
        },

        error: (error) => {
          this.snackBar.open('Ошибка отправки заявки');
          console.log(error);
        }
      });
  }

  closePopup() {
    this.form.reset();
    this.dialogRef?.close();
  }

}
