import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalImagesComponent } from './animal-images.component';

describe('AnimalImagesComponent', () => {
  let component: AnimalImagesComponent;
  let fixture: ComponentFixture<AnimalImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
