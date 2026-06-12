import {Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { CommentsService } from '../../services/comments.service';
import { checkResponse } from '../../helpers/response.helper';
import { CommentsType } from '../../../../types/comments.type';
import { CommentsResponseType } from '../../../../types/comments-response.type';
import { CommentActionType } from "../../../../types/comment-action.type";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommentUserActionType } from "../../../../types/comments-user-action.type";
import {LoaderService} from "../../services/loader.service";


@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  isLogged$: Observable<boolean>;
  commentText: string = '';
  comments: CommentsType[] = [];
  visibleComments: CommentsType[] = [];
  allCommentsCount: number = 0;
  offset: number = 0;

  @Input() articleId: string = '';

  constructor(
    private authService: AuthService,
    private commentsService: CommentsService,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService
  ) {
    this.isLogged$ = this.authService.isLogged$;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['articleId']) {
      this.loadComments();
    }
  }


  private loadComments(): void {
    this.offset = 0;

    this.commentsService
      .getComments(this.articleId, this.offset)
      .subscribe((data) => {
        const response = checkResponse<CommentsResponseType>(data);

        this.comments = response.comments;
        this.allCommentsCount = response.allCount;
        this.visibleComments = this.comments.slice(0, 3);
        this.offset = this.comments.length;


        if (this.authService.isLogged$.value) {
          this.commentsService
            .getArticleCommentActions(this.articleId)
            .subscribe(actions => {
              this.comments = this.syncUserActions(this.comments, actions);
              this.visibleComments = this.comments.slice(0, this.visibleComments.length);
            });
        }
      });
  }

  loadMoreComments(): void {

    this.loaderService.show();
    const startTime = Date.now();

    const hideLoader = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 400 - elapsed); // минимум 1 секунда

      setTimeout(() => {
        this.loaderService.hide();
      }, remaining);
    };

    if (this.visibleComments.length < this.comments.length) {
      const nextChunk = this.comments.slice(
        this.visibleComments.length,
        this.visibleComments.length + 10
      );

      this.visibleComments = [...this.visibleComments, ...nextChunk];

      hideLoader();
      return;
    }

    this.commentsService
      .getComments(this.articleId, this.offset)
      .subscribe({
        next: (data) => {
          const response = checkResponse<CommentsResponseType>(data);

          this.comments = [...this.comments, ...response.comments];
          this.offset = this.comments.length;

          const nextChunk = this.comments.slice(
            this.visibleComments.length,
            this.visibleComments.length + 10
          );

          this.visibleComments = [...this.visibleComments, ...nextChunk];

          if (this.authService.isLogged$.value) {
            this.commentsService
              .getArticleCommentActions(this.articleId)
              .subscribe(actions => {
                this.comments = this.syncUserActions(this.comments, actions);
                this.visibleComments = this.comments.slice(
                  0,
                  this.visibleComments.length
                );
              });
          }

          hideLoader();
        },
        error: () => {
          hideLoader();
        }
      });
  }

  sendComment(): void {
    if (!this.commentText.trim()) {
      return;
    }

    this.commentsService
      .addComments(this.commentText, this.articleId)
      .subscribe((response) => {
        if (!response.error) {
          this.commentText = '';
          this.loadComments();
        }
      });
  }

  get canLoadMore(): boolean {
    if (this.visibleComments.length < this.comments.length) {
      return true;
    }
    return this.comments.length < this.allCommentsCount;
  }

  applyAction(comment: CommentsType, action: CommentActionType): void {
    if (!this.authService.isLogged$.value) {
      this.snackBar.open('Войдите или зарегистрируйтесь, чтобы оценивать комментарии');
      return;
    }

    this.commentsService
      .applyAction(comment.id, action)
      .subscribe({
        next: (response) => {
          this.snackBar.open('Голос принят! 🗳️ Спасибо, что отметились 😊');
          if (!response.error) {
            if (action === 'like') {
              if (comment.userAction === 'like') {
                comment.likesCount--;
                comment.userAction = null;
              } else {
                if (comment.userAction === 'dislike') {
                  comment.dislikesCount--;
                }
                comment.likesCount++;
                comment.userAction = 'like';
              }
            }

            if (action === 'dislike') {
              if (comment.userAction === 'dislike') {
                comment.dislikesCount--;
                comment.userAction = null;
              } else {
                if (comment.userAction === 'like') {
                  comment.likesCount--;
                }
                comment.dislikesCount++;
                comment.userAction = 'dislike';
              }
            }

            if (action === 'violate') {
              this.snackBar.open('Спасибо! Мы получили вашу жалобу и проверим этот комментарий.');
            }
          }
        },
        error: (error) => {
          this.snackBar.open(
            error.error?.message || 'Это действие уже применено к комментарию'
          );
        }
      });

    this.comments = [...this.comments];
    this.visibleComments = [...this.visibleComments];
  }

  private syncUserActions(comments: CommentsType[], actions: CommentUserActionType[]): CommentsType[] {
    const actionMap = new Map(
      actions.map(a => [a.comment, a.action])
    );

    return comments.map(comment => ({
      ...comment,
      userAction: actionMap.get(comment.id) ?? null
    }));
  }
}
