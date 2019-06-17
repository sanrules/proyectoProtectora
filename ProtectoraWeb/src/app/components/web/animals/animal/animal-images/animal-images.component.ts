import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Animal } from 'src/app/_models/animal.model';
import { ImagesService } from 'src/app/_services/animals/images/images.service';
import { FirebaseStorageService } from 'src/app/_services/firebase-upload/firebase-upload-service';
import { AnimalService } from 'src/app/_services/animals/animal/animal-service';
import { AuthService } from '../../../../../_services/auth/auth.service';
import { UserService } from 'src/app/_services/user/user-service';



@Component({
  selector: 'app-animal-images',
  templateUrl: './animal-images.component.html',
  styleUrls: ['./animal-images.component.css'],
  providers: [NgbCarouselConfig]
})
export class AnimalImagesComponent implements OnInit {

  @Input() public animalData: Animal;
  @Input() animalId: number;

  animal: Animal;
  arrayAux: any[] = [];
  files: any[] = [];
  images: any[];
  images2: any[] = [];
  urlImageAr: any[] = [];
  urlImage: Observable<string>;
  uploadpercent: Observable<number>;

  userId: number;

  constructor(private imgService: ImagesService,
              private config: NgbCarouselConfig,
              private firestorage: FirebaseStorageService,
              private animalService: AnimalService,
              private imagesService: ImagesService,
              private authService: AuthService,
              private userService: UserService) {
    config.interval = 3000;
    config.showNavigationArrows = true;
  }

  ngOnInit() {
    this.imgService.getImagesByAnimal(this.animalId).subscribe(resp => {
      this.images = resp.response;
    });

    this.userId = this.authService.userIdLogged();
  }

  openImg(img) {
    window.open(img, '_blank');
  }

  openInput() {
    document.getElementById('imgUpload').click();
  }

  selectImage(event) {
    const file = event.target.files;
    this.files = file;
  }

  onUpload(images, id) {
    this.urlImageAr = [];
    for (let i = 0; i < images.length; i++){
      const imgId = Math.random().toString(36).substring(2);
      const filePath = `animalspictures/${id}/img_${imgId}`;
      const ref = this.firestorage.ref(filePath);
      const task = this.firestorage.upload(filePath, images[i]);
      this.uploadpercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {

            this.urlImageAr.push(url);
            if (this.urlImageAr.length === images.length)  {
              this.subirImagenes(id, this.urlImageAr);
            }
          });
        })).subscribe();
    }
  }

  public subirImagenes(id: number, arrayImages) {
    this.animalService.uploadImages(id, arrayImages ).subscribe( data => {
    }, error => {
        console.log('Error: ', error);
    });
  }

  public removeImage(imageName) {

    for (let i = 0; i < this.files.length; i++) {
        if ( this.files[i].name === imageName ) {
        } else {
        this.arrayAux.push(this.files[i]);
        }
    }
    this.files = this.arrayAux;
    this.arrayAux = [];

  }

  public loadImages() {
    this.imagesService.getImagesByAnimal(this.animalData.id).subscribe(e =>{
      this.images = e.response;
    });
  }

  public imageDelete(id) {

    this.imagesService.deleteImage(id).subscribe(data => {
      if (data.response === 'delete OK') {
      this.loadImages();
      }
    }, error => {
        console.warn('Error: ', error);
    });

  }

  public separarFechaYHora(fecha) {
    let arrayFechaYHora = fecha.split(' ');
    let arrayfecha = arrayFechaYHora[0].split('-');
    fecha = new Date(arrayfecha[0], (arrayfecha[1] - 1), arrayfecha[2]);
    return fecha;
  }

  dateToTimestamp(date) {

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    date = Date.UTC(year, month, day, 0, 0, 0);

    return date;
  }

  dataPrepare() {

    let formData = {
      "id":  this.animalData.id,
      "name": this.animalData.name,
      "type": this.animalData.type,
      "breed": this.animalData.breed,
      "gender": this.animalData.gender,
      "size": this.animalData.size,
      "birth_date": this.dateToTimestamp(this.separarFechaYHora(this.animalData.birth_date)),
      "entrance_date": this.dateToTimestamp(this.separarFechaYHora(this.animalData.entrance_date)),
      "adoption_date": null,
      "status": this.animalData.status,
      "description": this.animalData.description,
      "pictures": '',
      "user_id": this.animalData.user_id,
    };
    if (this.animalData.adoption_date === null) {
      formData.adoption_date = formData.entrance_date;
    } else {
      formData.adoption_date = this.dateToTimestamp(this.separarFechaYHora(this.animalData.adoption_date));
    }

    return formData;
  }

  registerSubmit() {

    this.animal = this.dataPrepare();
    if (this.animal.user_id == null){
      delete this.animal.user_id;
    }
    const userJSON = JSON.stringify(this.animal);
    this.animalService.updateAnimal(userJSON).subscribe(data => {

      this.onUpload(this.files, data.response);
        this.ngOnInit();
      },
      error => {
        console.log('Error: ', error);
      });
  }
}
