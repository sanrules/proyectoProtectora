import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-animal-images',
  templateUrl: './animal-images.component.html',
  styleUrls: ['./animal-images.component.css'],
  providers: [NgbCarouselConfig]
})
export class AnimalImagesComponent implements OnInit {

  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    config.showNavigationArrows = true;
  }

  ngOnInit() {
  }

}
