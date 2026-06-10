import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ArticleType} from "../../../types/article.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  count: number = 0;
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.authService.isLogged$.subscribe(isLogged => {
      if (isLogged) {
        this.getCartCount().subscribe();
      } else {
        this.resetCart();
      }
    });
  }

  getCart(): Observable<ArticleType | DefaultResponseType> {
    return this.http.get<ArticleType | DefaultResponseType>(environment.api + 'cart', {withCredentials: true});
  }

  getCartCount(): Observable<{count: number} | DefaultResponseType> {
    return this.http.get<{count: number} | DefaultResponseType>(environment.api + 'cart/count', {withCredentials: true})
    .pipe(
      tap(data => {
        if (!(data as DefaultResponseType).error) {
          this.count = (data as {count: number}).count;
          this.countSubject.next(this.count);
        }
      })
    )
  }

  updateCart(productId: string, quantity: number): Observable<ArticleType | DefaultResponseType> {
    return this.http.post<ArticleType | DefaultResponseType>(environment.api + 'cart', {productId, quantity}, {withCredentials: true})
      .pipe(
        tap(data => {

          if (!(data as DefaultResponseType).error) {
            this.count = 0;
            (data as ArticleType).items.forEach(item => {
              this.count += item.quantity;
            });
            this.countSubject.next(this.count);
          }
        })
      );
  }

  resetCart() {
    this.count = 0;
    this.countSubject.next(0);
  }

}
