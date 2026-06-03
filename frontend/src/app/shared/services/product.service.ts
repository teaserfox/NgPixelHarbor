import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PostType} from "../../../types/post.type";
import {ActiveParamsType} from "../../../types/active-params.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getBestProducts(): Observable<PostType[]> {
    return this.http.get<PostType[]>(environment.api + 'products/best');
  }

  getProducts(params: ActiveParamsType): Observable<{total: number, pages:number, items:PostType[]}> {
    return this.http.get<{total: number, pages:number, items:PostType[]}>(environment.api + 'products', {
      params:params
    });
  }

  searchProducts(query: string): Observable<PostType[]> {
    return this.http.get<PostType[]>(environment.api + 'products/search?query=' + query,

    );
  }

  getProduct(url: string): Observable<PostType> {
    return this.http.get<PostType>(environment.api + 'products/' + url);
  }
}
