import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAnimalComponent } from './registro-animal.component';

describe('RegistroAnimalComponent', () => {
  let component: RegistroAnimalComponent;
  let fixture: ComponentFixture<RegistroAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
