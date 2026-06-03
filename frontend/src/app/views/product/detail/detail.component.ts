// import {Component, OnInit, ViewChild} from '@angular/core';
// import {CarouselComponent, OwlOptions} from "ngx-owl-carousel-o";
// import {PostType} from "../../../../types/post.type";
// import {ProductService} from "../../../shared/services/product.service";
// import {ActivatedRoute} from "@angular/router";
// import {environment} from "../../../../environments/environment";
// import {CartType} from "../../../../types/cart.type";
// import {CartService} from "../../../shared/services/cart.service";
// import {PostService} from "../../../shared/services/post.service";
// import {FavoriteType} from "../../../../types/favorite.type";
// import {DefaultResponseType} from "../../../../types/default-response.type";
// import {AuthService} from "../../../core/auth/auth.service";
// import {MatSnackBar} from "@angular/material/snack-bar";
//
// @Component({
//   selector: 'app-detail',
//   templateUrl: './detail.component.html',
//   styleUrls: ['./detail.component.scss']
// })
// export class DetailComponent implements OnInit {
//
//   @ViewChild('owlCar', {static: false}) owlCar!: CarouselComponent;
//   @ViewChild('owlCarRev', {static: false}) owlCarRev!: CarouselComponent;
//
//   count: number = 1;
//   products: PostType[] = [];
//   product!: PostType;
//   serverStaticPath = environment.serverStaticPath;
//
//   customOptions: OwlOptions = {
//     loop: true,
//     mouseDrag: false,
//     touchDrag: false,
//     pullDrag: false,
//     dots: false,
//     navSpeed: 700,
//     margin: 24,
//     navText: ['', ''],
//     responsive: {
//       0: {
//         items: 1
//       },
//       400: {
//         items: 2
//       },
//       740: {
//         items: 3
//       },
//       940: {
//         items: 4
//       }
//     },
//     nav: false
//   }
//
//   constructor(private productService: ProductService,
//               private activatedRoute: ActivatedRoute,
//               private cartService: CartService,
//               private favoriteService: PostService,
//               private authService: AuthService,
//               private snackBar: MatSnackBar) { }
//
//   ngOnInit(): void {
//     this.activatedRoute.params.subscribe(params => {
//       this.productService.getProduct(params['url'])
//         .subscribe((data: PostType) => {
//           this.product = data;
//           this.cartService.getCart()
//             .subscribe((cartData: CartType  | DefaultResponseType) => {
//               if ((cartData as DefaultResponseType).error !== undefined) {
//                 throw new Error((cartData as DefaultResponseType).message);
//               }
//               const cartDataResponse = cartData as CartType;
//               if (cartDataResponse) {
//                 const productInCart = cartDataResponse.items.find(item => item.product.id === this.product.id);
//                 if (productInCart) {
//                   this.product.countInCart = productInCart.quantity;
//                   this.count = this.product.countInCart;
//                 }
//               }
//
//             });
//           if (this.authService.isLogged$.value) {
//             this.favoriteService.getFavorites()
//               .subscribe((data: FavoriteType[] | DefaultResponseType) => {
//                 if ((data as DefaultResponseType).error !== undefined) {
//                   const error = (data as DefaultResponseType).message;
//                   throw new Error(error);
//                 }
//                 const products = data as FavoriteType[];
//                 const currentProductExists = products.find(item => item.id === this.product.id);
//                 if (currentProductExists) {
//                   this.product.isInFavorite = true;
//                 }
//               });
//           }
//         });
//     })
//
//     this.productService.getBestProducts()
//       .subscribe((data: PostType[]) => {
//         console.log('PRODUCTS:', data);
//         this.products = data;
//       });
//   }
//
//   updateCount(value: number) {
//    this.count = value;
//     if (this.product.countInCart) {
//       this.cartService.updateCart(this.product.id, this.count)
//         .subscribe((data: CartType | DefaultResponseType) => {
//           if ((data as DefaultResponseType).error !== undefined) {
//             const error = (data as DefaultResponseType).message;
//             throw new Error(error);
//           }
//           this.product.countInCart = this.count;
//         });
//     }
//   }
//
//   addToCart() {
//     this.cartService.updateCart(this.product.id, this.count)
//       .subscribe((data: CartType | DefaultResponseType) => {
//         if ((data as DefaultResponseType).error !== undefined) {
//           const error = (data as DefaultResponseType).message;
//           throw new Error(error);
//         }
//         this.product.countInCart = this.count;
//       });
//   }
//
//   removeFromCart() {
//     this.cartService.updateCart(this.product.id, 0)
//       .subscribe((data: CartType | DefaultResponseType) => {
//         if ((data as DefaultResponseType).error !== undefined) {
//           const error = (data as DefaultResponseType).message;
//           throw new Error(error);
//         }
//         this.product.countInCart = 0;
//         this.count = 1;
//       });
//   }
//
//   updateFavorite(id: string) {
//     if (!this.authService.isLogged$.value) {
//       this.snackBar.open('Для доступа необходимо авторизоваться');
//       return;
//     }
//     if (this.product.isInFavorite) {
//         this.favoriteService.removeFavorite(this.product.id)
//           .subscribe((data: DefaultResponseType) => {
//             if (data.error) {
//               throw new Error(data.message);
//             }
//
//             this.product.isInFavorite = false;
//           });
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
// }
