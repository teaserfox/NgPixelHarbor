import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OrderPopupComponent} from "../../components/order-popup/order-popup.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  activeSection: string = '';
  currentYear = new Date().getFullYear();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  openPopup(): void {
    this.dialog.open(OrderPopupComponent, {
      panelClass: 'custom-popup',
      autoFocus: false,
    });
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
