import { TestBed } from '@angular/core/testing';

import { AnimalService } from './animal-service';

describe('AnimalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimalService = TestBed.get(AnimalService);
    expect(service).toBeTruthy();
  });
});
