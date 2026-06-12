import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {CommentsResponseType} from "../../../types/comments-response.type";
import {CommentActionType} from "../../../types/comment-action.type";
import {CommentUserActionType} from "../../../types/comments-user-action.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }


  getComments(articleId: string, offset: number = 0):
    Observable<CommentsResponseType | DefaultResponseType> {

    return this.http.get<CommentsResponseType | DefaultResponseType>(
      environment.api + 'comments',
      {
        params: {
          article: articleId,
          offset
        }
      }
    );
  }

  addComments(text: string, articleId: string):
    Observable<DefaultResponseType> {

    return this.http.post<DefaultResponseType>(
      environment.api + 'comments',
      {
        article: articleId,
        text
      }
    );
  }

  applyAction(commentId: string, action: CommentActionType) {
    return this.http.post<DefaultResponseType>(
      `${environment.api}comments/${commentId}/apply-action`,
      { action }
    );
  }

  getArticleCommentActions(articleId: string) {
    return this.http.get<CommentUserActionType[]>(
      `${environment.api}comments/article-comment-actions`,
      {
        params: {
          articleId
        }
      }
    );
  }

}
