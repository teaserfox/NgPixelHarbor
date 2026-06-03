// import {Component, Input, OnInit} from '@angular/core';
// import {PostType} from "../../../../types/post.type";
// import {environment} from "../../../../environments/environment";
// import {CartService} from "../../services/cart.service";
// import {CartType} from "../../../../types/cart.type";
// import {DefaultResponseType} from "../../../../types/default-response.type";
// import {FavoriteType} from "../../../../types/favorite.type";
// import {AuthService} from "../../../core/auth/auth.service";
// import {MatSnackBar} from "@angular/material/snack-bar";
// import {PostService} from "../../services/post.service";
// import {Router} from "@angular/router";
//
// @Component({
//   selector: 'product-card',
//   templateUrl: './product-card.component.html',
//   styleUrls: ['./product-card.component.scss']
// })
// export class ProductCardComponent implements OnInit {
//
//   @Input()
//   product!: PostType;
//   @Input()
//   isLight: boolean = false;
//   @Input()
//   countInCart: number | undefined = 0;
//
//
//   serverStaticPath = environment.serverStaticPath;
//   count: number = 1;
//
//   constructor(private cartService: CartService,
//               private authService: AuthService,
//               private favoriteService: PostService,
//               private snackBar: MatSnackBar,
//               private router: Router) {
//   }
//
//   ngOnInit(): void {
//     if (this.countInCart && this.countInCart > 1) {
//       this.count = this.countInCart;
//     }
//   }
//
//   addToCart() {
//     this.cartService.updateCart(this.product.id, this.count)
//       .subscribe((data: CartType  | DefaultResponseType) => {
//         if ((data as DefaultResponseType).error !== undefined) {
//           const error = (data as DefaultResponseType).message;
//           throw new Error(error);
//         }
//         this.countInCart = this.count;
//       });
//   }
//
//   updateCount(value: number) {
//     this.count = value;
//     if (this.countInCart) {
//       this.cartService.updateCart(this.product.id, this.count)
//         .subscribe((data: CartType | DefaultResponseType) => {
//           if ((data as DefaultResponseType).error !== undefined) {
//             const error = (data as DefaultResponseType).message;
//             throw new Error(error);
//           }
//           this.countInCart = this.count;
//         });
//     }
//   }
//
//   removeFromCart() {
//     this.cartService.updateCart(this.product.id, 0)
//       .subscribe((data: CartType  | DefaultResponseType) => {
//         if ((data as DefaultResponseType).error !== undefined) {
//           const error = (data as DefaultResponseType).message;
//           throw new Error(error);
//         }
//         this.countInCart = 0;
//         this.count = 1;
//       });
//   }
//
//   updateFavorite() {
//     if (!this.authService.isLogged$.value) {
//       this.snackBar.open('Для доступа необходимо авторизоваться');
//       return;
//     }
//     if (this.product.isInFavorite) {
//       this.favoriteService.removeFavorite(this.product.id)
//         .subscribe((data: DefaultResponseType) => {
//           if (data.error) {
//             throw new Error(data.message);
//           }
//
//           this.product.isInFavorite = false;
//         });
//     } else {
//       this.favoriteService.addFavorite(this.product.id)
//         .subscribe((data: FavoriteType | DefaultResponseType) => {
//           if ((data as DefaultResponseType).error !== undefined) {
//             throw new Error((data as DefaultResponseType).message);
//           }
//           this.product.isInFavorite = true;
//         });
//     }
//   }
//
//   navigate() {
//     if (this.isLight) {
//       this.router.navigate(['/product/' + this.product.url])
//     }
//   }
//
// }
