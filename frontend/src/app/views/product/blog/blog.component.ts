import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {PostType} from "../../../../types/post.type";
import {CategoryService} from "../../../shared/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {AppliedFilterType} from "../../../../types/applied-filter";
import {CartService} from "../../../shared/services/cart.service";
import {CartType} from "../../../../types/cart.type";
import {PostService} from "../../../shared/services/post.service";
import {AuthService} from "../../../core/auth/auth.service";
import {checkResponse} from "../../../shared/helpers/response.helper";
import {CategoryType} from "../../../../types/category.type";
import {PostsResponseType} from "../../../../types/post-response.type";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {

  posts: PostType[] = [];
  sortingOpens: CategoryType[] = [];
  activeParams: ActiveParamsType = {
    types: [],
    sort: []
  };
  appliedFilters: AppliedFilterType[] = [];
  sortingOpen = false;
  pages: number[] = [];
  loading = true;
  cart: CartType | null = null;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private elementRef: ElementRef,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.categoryService.getCategories()
      .subscribe(data => {
        this.sortingOpens = checkResponse<CategoryType[]>(data);
        this.activatedRoute.queryParams
          .subscribe(params => {
            const sort = params['sort'];
            const page = params['page'];
            this.activeParams.sort = Array.isArray(sort)
              ? sort
              : sort
                ? [sort]
                : [];
            this.activeParams.page = page ? +page : 1;
            this.updateAppliedFilters();
            this.loadPosts();
          });
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


  private loadPosts(): void {
    this.loading = true;

    this.postService.getPostAll(this.activeParams)
      .subscribe((data: PostsResponseType) => {

        const posts = data.items;
        this.pages = Array.from({ length: data.pages }, (_, i) => i + 1);

        if (!this.activeParams.sort.length) {
          this.posts = posts;
        } else {
          const selectedCategories = this.sortingOpens
            .filter(c => this.activeParams.sort.includes(c.url))
            .map(c => c.name);

          this.posts = posts.filter(post =>
            selectedCategories.includes(post.category)
          );
        }

        this.loading = false;
      });
  }

  private updateAppliedFilters(): void {
    this.appliedFilters = this.activeParams.sort.map(url => {
      const category = this.sortingOpens.find(c => c.url === url);

      return {
        name: category?.name || url,
        urlParam: url
      };
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
    const current = [...this.activeParams.sort];

    const exists = current.includes(category.url);

    const updated = exists
      ? current.filter(c => c !== category.url)
      : [...current, category.url];

    this.router.navigate(['/blog'], {
      queryParams: {sort: updated}
    });
  }

  openPage(page: number) {
    this.router.navigate(['/blog'], {
      queryParams: {
        ...this.activeParams,
        page
      }
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      const page = this.activeParams.page - 1;

      this.router.navigate(['/blog'], {
        queryParams: {
          ...this.activeParams,
          page
        }
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      const page = this.activeParams.page + 1;

      this.router.navigate(['/blog'], {
        queryParams: {
          ...this.activeParams,
          page
        }
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
