import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PostType} from "../../../types/post.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {PostsResponseType} from "../../../types/post-response.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleType} from "../../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) {
  }

  getPost(): Observable<PostType[] | DefaultResponseType> {
    return this.http.get<PostType[] | DefaultResponseType>(environment.api + 'articles/top');
  }

  getPostAll(params?: ActiveParamsType): Observable<PostsResponseType> {
    let queryParams: any = {
      page: params?.page ?? 1
    };

    if (params?.sort?.length) {
      queryParams['categories[]'] = params.sort;
    }

    return this.http.get<PostsResponseType>(
      environment.api + 'articles',
      {params: queryParams}
    );
  }

  getArticle(url: string): Observable<ArticleType | DefaultResponseType> {
    return this.http.get<ArticleType | DefaultResponseType>(environment.api + 'articles/' + url);
  }

  getRelatedArticles(url: string): Observable<PostType[] | DefaultResponseType> {
    return this.http.get<PostType[] | DefaultResponseType>(
      environment.api + 'articles/related/' + url
    );
  }

}
