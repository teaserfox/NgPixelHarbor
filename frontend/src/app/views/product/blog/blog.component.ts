import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {PostType} from "../../../../types/post.type";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryWithTypeType} from "../../../../types/category-with-type.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {AppliedFilterType} from "../../../../types/applied-filter";
import {CartService} from "../../../shared/services/cart.service";
import {CartType} from "../../../../types/cart.type";
import {PostService} from "../../../shared/services/post.service";
import {FavoriteType} from "../../../../types/favorite.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {AuthService} from "../../../core/auth/auth.service";
import {checkResponse} from "../../../shared/helpers/response.helper";
import {CategoryType} from "../../../../types/category.type";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {

  products: PostType[] = [];
  sortingOpens: CategoryType[] = [];
  categoriesWithTypes: CategoryWithTypeType[] = [];
  activeParams: ActiveParamsType = {
    types: [],
    sort: []
  };
  appliedFilters: AppliedFilterType[] = [];
  sortingOpen = false;
  pages: number[] = [];
  loading = true;
  cart: CartType | null = null;
  favoriteProducts: FavoriteType[] | null = null;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private favoriteService: PostService,
              private authService: AuthService,
              private elementRef: ElementRef,
              private router: Router) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe(data => {
        const result = checkResponse<CategoryType[]>(data);
        this.sortingOpens = result;
        this.activatedRoute.queryParams.subscribe(params => {

          const sort = params['sort'];

          if (!sort) {
            this.activeParams.sort = [];
          } else if (Array.isArray(sort)) {
            this.activeParams.sort = sort;
          } else {
            this.activeParams.sort = [sort];
          }

          this.appliedFilters = this.activeParams.sort.map(
            url => {
              const category = this.sortingOpens.find(item => item.url === url);
              return {
                name: category?.name || url,
                urlParam: url
              };
            }
          )
        });
      });

    this.cartService.getCart()
      .subscribe((data: CartType  | DefaultResponseType) => {

        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.cart = data as CartType;

        // if (this.authService.isLogged$.value) {
        //   this.favoriteService.getFavorites()
        //     .subscribe(
        //       {
        //         next: (data: FavoriteType[] | DefaultResponseType) => {
        //           if ((data as DefaultResponseType).error !== undefined) {
        //             const error = (data as DefaultResponseType).message;
        //             this.processCatalog();
        //             throw new Error(error);
        //           }
        //           this.favoriteProducts = data as FavoriteType[];
        //           this.processCatalog();
        //         },
        //         error: (error) => {
        //           this.processCatalog();
        //         }
        //
        //       });
        // } else
        {
          this.processCatalog();
        }
      });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement
      .querySelector('.blog-sorting')
      ?.contains(event.target);

    if (!clickedInside) {
      this.sortingOpen = false;
    }
  }

  processCatalog() {
    this.categoryService.getCategoriesWithTypes()
      .subscribe(data => {
        this.categoriesWithTypes = data;

        this.activatedRoute.queryParams
          .pipe(
            // debounceTime(100)
          )
          .subscribe(params => {
            this.loading = true;
            // this.activeParams = ActiveParamsUtil.processParams(params);
            if (!this.activeParams.page) {
              this.activeParams.page = 1;
            }
            // this.appliedFilters = [];
            this.activeParams.sort.forEach(url => {
              const category = this.sortingOpens.find(
                item => item.url === url
              );
              if (category) {
                this.appliedFilters.push({
                  name: category.name,
                  urlParam: category.url
                });
              }
            });
            this.productService.getProducts(this.activeParams)
              .subscribe(data => {

                this.pages = Array.from({ length: data.pages }, (_, i) => i + 1);

                this.products = data.items.map(product => {

                  const productInCart = this.cart?.items?.find(
                    item => item.product.id === product.id
                  );
                  // product.countInCart = productInCart ? productInCart.quantity : 0;

                  const productInFavorite = this.favoriteProducts?.find(
                    item => item.id === product.id
                  );
                  // product.isInFavorite = !!productInFavorite;

                  return product;
                });

                this.loading = false;
              });
          });
      });
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
   this.appliedFilters = this.appliedFilters.filter(
     item => item.urlParam !== appliedFilter.urlParam
   );
   this.activeParams.sort = this.activeParams.sort.filter(
     item => item !== appliedFilter.urlParam
   );
    this.preserveScroll(() => {
      this.router.navigate(['/blog'], {
        queryParams: {
          sort: this.activeParams.sort
        }
      });
    });
  }

  toggleSorting() {
    this.sortingOpen = !this.sortingOpen;
  }

  sort(category: CategoryType): void {
    if (!this.activeParams.sort) {
      this.activeParams.sort = [];
    }
    const exists = this.activeParams.sort.includes(category.url);

    if (exists) {

      this.activeParams.sort =
        this.activeParams.sort.filter(
          item => item !== category.url
        );

      this.appliedFilters =
        this.appliedFilters.filter(
          item => item.urlParam !== category.url
        );

    } else {

      this.activeParams.sort.push(category.url);

      this.appliedFilters.push({
        name: category.name,
        urlParam: category.url
      });

    }

    this.router.navigate(['/blog'], {
      queryParams: {
        sort: this.activeParams.sort
      }
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }

  trackById(index: number, item: PostType) {
    return item.id;
  }

  private preserveScroll(fn: () => void) {
    const y = window.scrollY;

    fn();

    setTimeout(() => {
      window.scrollTo(0, y);
    }, 0);
  }

}
