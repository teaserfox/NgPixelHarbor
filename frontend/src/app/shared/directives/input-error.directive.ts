import {
  Directive,
  DoCheck,
  ElementRef,
  Input
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appInputError]'
})
export class InputErrorDirective implements DoCheck {

  @Input() appInputError!: AbstractControl | null;

  constructor(private el: ElementRef) {}

  ngDoCheck(): void {

    const invalid =
      !!this.appInputError &&
      this.appInputError.invalid &&
      (this.appInputError.dirty || this.appInputError.touched);

    if (invalid) {
      this.el.nativeElement.classList.add('input-error');
    } else {
      this.el.nativeElement.classList.remove('input-error');
    }
  }
}
