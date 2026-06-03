import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  isLogged$: Observable<boolean>;
  user$ = this.userService.user$;
  activeSection: string = '';

  // serverStaticPath = environment.serverStaticPath;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.isLogged$ = this.authService.isLogged$;
  }


  ngOnInit(): void {
    this.userService.loadUser();
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

  ngAfterViewInit(): void {

    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(
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
      observer.observe(section);
    });

  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
