import { Component, OnInit, Input } from '@angular/core';
import { ImagesService } from 'src/app/_services/animals/images/images.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from 'src/app/_services/animals/comments/comment.service';

@Component({
  selector: 'app-animal-images',
  templateUrl: './animal-images.component.html',
  styleUrls: ['./animal-images.component.css'],
  providers: [NgbCarouselConfig]
})
export class AnimalImagesComponent implements OnInit {

  images: any[];

  @Input() animalId: number;

  constructor(private imgService: ImagesService,
              private config: NgbCarouselConfig) {
    config.interval = 3000;
    config.showNavigationArrows = true;
  }

  ngOnInit() {
    this.imgService.getImagesByAnimal(this.animalId).subscribe(resp => {
      this.images = resp.response;
    });
  }

}
