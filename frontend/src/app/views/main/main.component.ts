import {Component, OnInit, ViewChild} from '@angular/core';
import {PostType} from "../../../types/post.type";
import {OwlOptions} from 'ngx-owl-carousel-o';
import {CarouselComponent} from 'ngx-owl-carousel-o';
import {ArticlesService} from "../../shared/services/articles.service";
import {checkResponse} from "../../shared/helpers/response.helper";
import {environment} from "../../../environments/environment";
import {OrderPopupComponent} from "../../shared/components/order-popup/order-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  @ViewChild('owlCar', {static: false}) owlCar!: CarouselComponent;
  @ViewChild('owlCarRev', {static: false}) owlCarRev!: CarouselComponent;


  posts: PostType[] = [];
  serverStaticPath = environment.serverStaticPath;
  reviewsStaticPath = 'assets/images/page/reviews/';


  customOptions: OwlOptions = {
    items: 1,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    smartSpeed: 2500,
    navSpeed: 2500,
    margin: 24,
    navText: [''],
    nav: false
  }

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 26,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }

  reviews = [
    {
      name: 'Ирина',
      image: 'review1.png',
      text: 'В ассортименте я встретила все комнатные растения, ' +
        'которые меня интересовали. Цены - лучшие в городе. ' +
        'Доставка - очень быстрая и с заботой о растениях. '
    },
    {
      name: 'Анастасия',
      image: 'review2.png',
      text: 'Спасибо огромное! Цветок арека невероятно красив - просто бомба! ' +
        'От него все в восторге! Спасибо за сервис - все удобно сделано, ' +
        'доставили быстро. И милая открыточка приятным бонусом.'
    },
    {
      name: 'Илья',
      image: 'review3.png',
      text: 'Магазин супер! Второй раз заказываю курьером, доставлено в лучшем виде. ' +
        'Ваш ассортимент комнатных растений впечатляет! ' +
        'Спасибо вам за хорошую работу!'
    },
    {
      name: 'Аделина',
      image: 'review4.jpg',
      text: 'Хочу поблагодарить всю команду за помощь в подборе подарка для моей мамы! ' +
        'Все просто в восторге от мини-сада! А самое главное, ' +
        'что за ним удобно ухаживать, ведь в комплекте мне дали целую инструкцию.'
    },
    {
      name: 'Яника',
      image: 'review5.jpg',
      text: 'Спасибо большое за мою обновлённую коллекцию суккулентов! ' +
        'Сервис просто на 5+: быстро, удобно, недорого. ' +
        'Что ещё нужно клиенту для счастья?'
    },
    {
      name: 'Марина',
      image: 'review6.jpg',
      text: 'Для меня всегда важным аспектом было наличие не только физического магазина, ' +
        'но и онлайн-маркета, ведь не всегда есть возможность прийти на место. ' +
        'Ещё нигде не встречала такого огромного ассортимента!'
    },
    {
      name: 'Станислав',
      image: 'review7.jpg',
      text: 'Хочу поблагодарить консультанта Ирину за помощь в выборе цветка для моей жены. ' +
        'Я ещё никогда не видел такого трепетного отношения к весьма непростому клиенту, ' +
        'которому сложно угодить! Сервис – огонь!'
    },
  ];

  solutions = [
    {
      image: '1.png',
      title: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный ' +
        'и самое главное продающий сайт для продвижения ' +
        'Вашего бизнеса!',
      price: 7500,
    },
    {
      image: '2.png',
      title: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или ' +
        'грамотный таргетолог? Мы готовы оказать Вам услугу ' +
        '“Продвижения” на наивысшем уровне!',
      price: 3500,
    },
    {
      image: '3.png',
      title: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес ' +
        'или специалист. Обращаясь к нам, мы гарантируем ' +
        'быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 1000,
    },
    {
      image: '4.png',
      title: 'Копирайтинг',
      text: 'Наши копирайтеры готовы написать Вам любые продающие текста, ' +
        'которые не только обеспечат рост охватов, но и помогут ' +
        'выйти на новый уровень в продажах.',
      price: 750,
    }
  ];

  slider = [
    {
      image: '1.png',
      bonus: ' Предложение месяца',
      titleParts: [
        {
          title: 'Продвижение в Instagram\n' +
            '                  для вашего бизнеса',
          highlight: false,
        },
        {
          title: '-15%',
          highlight: true,
        },
        {
          title: '!',
          highlight: false,
        },
      ],
      title: '',
      text: 'Продвижение',
    },
    {
      image: '2.png',
      bonus: ' Предложение месяца',
      titleParts: [
        {
          title: 'Нужен грамотный',
          highlight: false,
        },
        {
          title:'копирайтер',
          highlight: true,
        },
        {
          title: '?',
          highlight: false,
        },
      ],
      title: 'Весь декабрь у нас действует акция на работу копирайтера.',
      text: 'Копирайтинг',
    },
    {
      image: '3.png',
      bonus: ' Новость дня',
      titleParts: [
        {
          title: '6 место ',
          highlight: true,
        },
        {
          title: 'в ТОП-10 SMM-агентств Москвы!',
          highlight: false,
        },
      ],
      title: 'Мы благодарим каждого, кто голосовал за нас!',
      text: 'Реклама',
    },
  ];


  constructor(private postService: ArticlesService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.postService.getPost()
      .subscribe((data) => {
        this.posts = checkResponse<PostType[]>(data);
      });
  }

  openOrderPopup(service: string): void {
    this.dialog.open(OrderPopupComponent, {
      panelClass: 'custom-popup',
      autoFocus: false,
      data: {
        service: service,
        servicesList: this.solutions.map(s => s.title),
        mode: service ? 'service' : 'select-service',
        title: 'Оставьте заявку',
        type: 'order'
      }
    });
  }

  openArticleOrderPopup(service: string): void {
    this.dialog.open(OrderPopupComponent, {
      panelClass: 'custom-popup',
      autoFocus: false,
      data: {
        mode: 'select',
        servicesList: this.solutions.map(s => s.title),
        preselectedService: service
      }
    });
  }
}
