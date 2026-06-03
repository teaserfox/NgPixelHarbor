import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {OrderPopupComponent} from "../order-popup/order-popup.component";

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OrderPopupComponent>) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.dialogRef?.close();
  }

}
