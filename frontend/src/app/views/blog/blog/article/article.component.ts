import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../core/auth/auth.service";
import {ArticlesService} from "../../../../shared/services/articles.service";
import {checkResponse} from "../../../../shared/helpers/response.helper";
import {ArticleType} from "../../../../../types/article.type";
import {environment} from "../../../../../environments/environment";
import {PostType} from "../../../../../types/post.type";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit {

  article: ArticleType | null = null;
  relatedArticles: PostType[] = [];
  serverStaticPath = environment.serverStaticPath;

  constructor(
              private activatedRoute: ActivatedRoute,
              private articlesService: ArticlesService,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const url = params['url'];

      this.articlesService.getArticle(url)
        .subscribe(response => {
          const article = checkResponse<ArticleType>(response);
          this.article = article;

          this.loadRelatedArticles(url);
        });
    });
  }

  loadRelatedArticles(url: string): void {

    this.articlesService.getRelatedArticles(url)
      .subscribe(posts => {

        this.relatedArticles =
          checkResponse<PostType[]>(posts);

      });
  }

}
