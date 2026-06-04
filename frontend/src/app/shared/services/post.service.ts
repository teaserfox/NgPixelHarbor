import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PostType} from "../../../types/post.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {PostsResponseType} from "../../../types/post-response.type";
import {ActiveParamsType} from "../../../types/active-params.type";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPost(): Observable<PostType[] | DefaultResponseType> {
    return this.http.get<PostType[] | DefaultResponseType>(environment.api + 'articles/top');
  }

  getPostAll(params?: ActiveParamsType): Observable<PostsResponseType> {
    return this.http.get<PostsResponseType>(environment.api + 'articles', {
      params: {
        page: params?.page ?? 1,
        sort: params?.sort?.join(',') ?? ''
      }
    });
  }
}
