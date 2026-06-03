import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordRepeatDirective} from "./directives/password-repeat.directive";

import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CountSelectorComponent } from './components/count-selector/count-selector.component';
import { IfAuthDirective } from './directives/if-auth.directive';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import { OrderPopupComponent } from './components/order-popup/order-popup.component';
import { SuccessPopupComponent } from './components/success-popup/success-popup.component';
import {NgxMaskModule} from "ngx-mask";
import { TruncatePipe } from './pipes/truncate.pipe';
import {PostBlogComponent} from "./components/product-card/post-blog.component";



@NgModule({
  declarations:
    [
      PasswordRepeatDirective,
      PostBlogComponent,
      CountSelectorComponent,
      IfAuthDirective,
      LoaderComponent,
      OrderPopupComponent,
      SuccessPopupComponent,
      TruncatePipe
    ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(),
    MatDialogModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule,
  ],
  exports: [
    PasswordRepeatDirective,
    PostBlogComponent,
    CountSelectorComponent,
    IfAuthDirective,
    LoaderComponent,
    NgxMaskModule,
    OrderPopupComponent,
    TruncatePipe
  ]
})
export class SharedModule { }
