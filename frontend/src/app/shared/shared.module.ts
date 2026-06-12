import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IfAuthDirective } from './directives/if-auth.directive';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import { OrderPopupComponent } from './components/order-popup/order-popup.component';
import { SuccessPopupComponent } from './components/success-popup/success-popup.component';
import {NgxMaskModule} from "ngx-mask";
import { TruncatePipe } from './pipes/truncate.pipe';
import {PostBlogComponent} from "./components/post-blog/post-blog.component";
import {InputErrorDirective} from "./directives/input-error.directive";
import { CommentsComponent } from './components/comments/comments.component';



@NgModule({
  declarations:
    [
      InputErrorDirective,
      PostBlogComponent,
      IfAuthDirective,
      LoaderComponent,
      OrderPopupComponent,
      SuccessPopupComponent,
      TruncatePipe,
      CommentsComponent
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
    InputErrorDirective,
    PostBlogComponent,
    IfAuthDirective,
    LoaderComponent,
    NgxMaskModule,
    OrderPopupComponent,
    TruncatePipe,
    CommentsComponent
  ]
})
export class SharedModule { }
