import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';


import {SharedModule} from "../../shared/shared.module";
import {CarouselModule} from "ngx-owl-carousel-o";
import {BlogComponent} from "./blog/blog.component";


@NgModule({
  declarations: [
    BlogComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule,
    ProductRoutingModule,
    CarouselModule
  ]
})
export class ProductModule { }
