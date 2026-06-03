import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PostType} from "../../../types/post.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPost(): Observable<PostType[] | DefaultResponseType> {
    return this.http.get<PostType[] | DefaultResponseType>(environment.api + 'articles/top');
  }

  getPostAll(): Observable<PostType[] | DefaultResponseType> {
    return this.http.get<PostType[] | DefaultResponseType>(environment.api + 'articles');
  }
}
