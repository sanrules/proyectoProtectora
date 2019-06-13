import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../_services/news/news-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgArray: any[] =
    ['img1.jpeg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg'];

  imgBackground: string;

  config: any;
  fullpage_api: any;

  news: any[];

  constructor(private newsService: NewsService,
              private router: Router) {
    this.config = {

      // fullpage options
      licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: ['inicio', 'noticias', 'enlaces'],
      navigation: true,
      menu: '#menu',

      // fullpage callbacks
      afterResize: () => {
      },
      afterLoad: (origin, destination, direction) => {
      }
    };
  }

   getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  ngOnInit() {
    this.imgBackground = this.imgArray[Math.floor((Math.random() * 9) + 1)];

    this.newsService.getNews().subscribe(newsGet => {
      this.news = newsGet.response;
      console.log('news: ', this.news);
    });
  }

}
