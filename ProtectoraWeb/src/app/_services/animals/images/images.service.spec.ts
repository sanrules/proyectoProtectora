import { TestBed } from '@angular/core/testing';

import { ImagesService } from './images.service';

describe('AnimalImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagesService = TestBed.get(ImagesService);
    expect(service).toBeTruthy();
  });
});
