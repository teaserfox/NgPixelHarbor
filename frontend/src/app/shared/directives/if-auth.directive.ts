import {
  Directive, TemplateRef, ViewContainerRef, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import {AuthService} from "../../core/auth/auth.service";

@Directive({
  selector: '[appIfAuth]'
})
export class IfAuthDirective implements OnDestroy {

  private hasView = false;
  private sub: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.sub = this.authService.isLogged$.subscribe(isLogged => {
      this.updateView(isLogged);
    });
  }

  private updateView(isLogged: boolean) {
    if (isLogged && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }

    if (!isLogged && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
