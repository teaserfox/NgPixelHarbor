import {Component, Input, OnInit} from '@angular/core';
import {PostType} from "../../../../types/post.type";
import {environment} from "../../../../environments/environment";
import {CartService} from "../../services/cart.service";
import {CartType} from "../../../../types/cart.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {FavoriteType} from "../../../../types/favorite.type";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {checkResponse} from "../../helpers/response.helper";

@Component({
  selector: 'post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.scss']
})
export class PostBlogComponent implements OnInit {


  @Input() posts: PostType[] = [];
  serverStaticPath = environment.serverStaticPath;


  constructor(private postService: PostService,
              private favoriteService: PostService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.postService.getPost()
      .subscribe(posts => {
        const result = checkResponse<PostType[]>(posts);
        this.posts = result;
      })

  }

  // addToCart() {
  //   this.cartService.updateCart(this.product.id, this.count)
  //     .subscribe((data: CartType  | DefaultResponseType) => {
  //       if ((data as DefaultResponseType).error !== undefined) {
  //         const error = (data as DefaultResponseType).message;
  //         throw new Error(error);
  //       }
  //       this.countInCart = this.count;
  //     });
  // }

  // updateCount(value: number) {
  //   this.count = value;
  //   if (this.countInCart) {
  //     this.cartService.updateCart(this.product.id, this.count)
  //       .subscribe((data: CartType | DefaultResponseType) => {
  //         if ((data as DefaultResponseType).error !== undefined) {
  //           const error = (data as DefaultResponseType).message;
  //           throw new Error(error);
  //         }
  //         this.countInCart = this.count;
  //       });
  //   }
  // }

  // removeFromCart() {
  //   this.cartService.updateCart(this.product.id, 0)
  //     .subscribe((data: CartType  | DefaultResponseType) => {
  //       if ((data as DefaultResponseType).error !== undefined) {
  //         const error = (data as DefaultResponseType).message;
  //         throw new Error(error);
  //       }
  //       this.countInCart = 0;
  //       this.count = 1;
  //     });
  // }

  // updateFavorite() {
  //   if (!this.authService.isLogged$.value) {
  //     this.snackBar.open('Для доступа необходимо авторизоваться');
  //     return;
  //   }
  //   if (this.product.isInFavorite) {
  //     this.favoriteService.removeFavorite(this.product.id)
  //       .subscribe((data: DefaultResponseType) => {
  //         if (data.error) {
  //           throw new Error(data.message);
  //         }
  //
  //         this.product.isInFavorite = false;
  //       });
  //   } else {
  //     this.favoriteService.addFavorite(this.product.id)
  //       .subscribe((data: FavoriteType | DefaultResponseType) => {
  //         if ((data as DefaultResponseType).error !== undefined) {
  //           throw new Error((data as DefaultResponseType).message);
  //         }
  //         this.product.isInFavorite = true;
  //       });
  //   }
  // }

  // navigate() {
  //   if (this.isLight) {
  //     this.router.navigate(['/product/' + this.product.url])
  //   }
  // }

}
