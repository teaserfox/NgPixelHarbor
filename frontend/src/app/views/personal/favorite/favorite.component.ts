// import {Component, OnInit} from '@angular/core';
// import {FavoriteService} from "../../../shared/services/favorite.service";
// import {FavoriteType} from "../../../../types/favorite.type";
// import {DefaultResponseType} from "../../../../types/default-response.type";
// import {environment} from "../../../../environments/environment";
// import {CartType} from "../../../../types/cart.type";
// import {CartService} from "../../../shared/services/cart.service";
//
// @Component({
//   selector: 'app-favorite',
//   templateUrl: './favorite.component.html',
//   styleUrls: ['./favorite.component.scss']
// })
//
//
// export class FavoriteComponent implements OnInit {
//   products: FavoriteType[] = [];
//   serverStaticPath = environment.serverStaticPath;
//   product!: FavoriteType;
//   cartItems: CartType[] = [];
//
//
//
//   constructor(private favoriteService: FavoriteService, private cartService: CartService,) {
//   }
//
//   ngOnInit(): void {
//     this.favoriteService.getFavorites().subscribe((data: FavoriteType[] | DefaultResponseType) => {
//       if ((data as DefaultResponseType).error !== undefined) {
//         const error = (data as DefaultResponseType).message;
//         throw new Error(error);
//       }
//       this.products = data as FavoriteType[];
//
//       this.products.forEach(p => {
//         p.selectedCount = p.countInCart || 1;
//       });
//
//       this.cartService.getCart().subscribe((cart) => {
//
//         if ((cart as DefaultResponseType).error !== undefined) {
//           return;
//         }
//
//         const cartData = cart as CartType;
//
//         this.products.forEach(product => {
//           const inCart = cartData.items.find(item => item.product.id === product.id);
//           if (inCart) {
//             product.countInCart = inCart.quantity;
//             product.selectedCount = inCart.quantity;
//           } else {
//             product.countInCart = 0;
//           }
//         });
//       });
//     });
//   }
//
//   updateCount(product: FavoriteType,value: number) {
//     product.selectedCount = value;
//     if (this.product.countInCart) {
//       this.cartService.updateCart(this.product.id, product.selectedCount)
//         .subscribe((data: CartType | DefaultResponseType) => {
//           if ((data as DefaultResponseType).error !== undefined) {
//             const error = (data as DefaultResponseType).message;
//             throw new Error(error);
//           }
//           this.product.countInCart = product.selectedCount;
//         });
//     }
//   }
//
//   addToCart(product: FavoriteType) {
//     this.cartService.updateCart(product.id, product.selectedCount).subscribe((data: CartType | DefaultResponseType) => {
//       if ((data as DefaultResponseType).error !== undefined) {
//         const error = (data as DefaultResponseType).message;
//         throw new Error(error);
//       }
//       product.countInCart = product.selectedCount;
//     });
//   }
//
//   removeFromCart(product: FavoriteType) {
//     this.cartService.updateCart(product.id, 0)
//       .subscribe((data: CartType | DefaultResponseType) => {
//         if ((data as DefaultResponseType).error !== undefined) {
//           const error = (data as DefaultResponseType).message;
//           throw new Error(error);
//         }
//         product.countInCart = 0;
//         product.selectedCount = 1;
//       });
//   }
//
//   removeFromFavorites(id: string) {
//     this.favoriteService.removeFavorite(id).subscribe((data: DefaultResponseType) => {
//       if (data.error) {
//         throw new Error(data.message);
//       }
//       this.products = this.products.filter(item => item.id != id);
//     });
//   }
// }
