import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgArray: any[] =
    ['img1.jpeg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg'];

  imgBackground: string;


  constructor() { }

  ngOnInit() {
    this.imgBackground = this.imgArray[Math.floor((Math.random() * 9) + 1)];
    console.log(Math.floor((Math.random() * 10) + 1))
  }

}
