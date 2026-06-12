import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {filter, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit {

  isLogged$: Observable<boolean>;
  user$ = this.userService.user$;
  activeSection: string = '';


  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private userService: UserService,
              public router: Router) {
    this.isLogged$ = this.authService.isLogged$;
  }


  ngOnInit(): void {
    this.userService.loadUser();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        if (this.router.url === '/' || this.router.url.startsWith('/#')) {
          setTimeout(() => {
            this.initSectionObserver();
          }, 100);
        }

        if (this.router.url.startsWith('/articles')) {
          this.activeSection = '';
          return;
        }

      });
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this.userService.clearUser();
    this.snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

  private observer?: IntersectionObserver;

  private initSectionObserver(): void {
    this.activeSection = '';

    if (this.observer) {
      this.observer.disconnect();
    }

    const sections = document.querySelectorAll('section');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      {
        threshold: 0.3
      }
    );
    sections.forEach(section => {
      this.observer?.observe(section);
    });
  }

  ngAfterViewInit(): void {
    this.initSectionObserver();
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
