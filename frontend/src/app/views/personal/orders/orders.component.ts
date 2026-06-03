import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../shared/services/order.service";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {OrderType} from "../../../../types/order.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {checkResponse} from "../../../shared/helpers/response.helper";
import {UserInfoType} from "../../../../types/user-info.type";
import {OrderStatusUtil} from "../../../shared/utils/order-status.util";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: OrderType[] = [];

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private router: Router) { }


  ngOnInit(): void {
    this.orderService.getOrder()
      .subscribe((data: OrderType[] | DefaultResponseType) => {
        this.orders = (checkResponse<OrderType[]>(data)).map(item => {
          const status = OrderStatusUtil.getStatusAndColor(item.status);
          item.statusRus = status.name;
          item.color =status.color;

          return item;
        });
      });
  }

}
