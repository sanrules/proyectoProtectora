import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptedAnimalsComponent } from './adopted-animals.component';

describe('AdoptedAnimalsComponent', () => {
  let component: AdoptedAnimalsComponent;
  let fixture: ComponentFixture<AdoptedAnimalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptedAnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptedAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
