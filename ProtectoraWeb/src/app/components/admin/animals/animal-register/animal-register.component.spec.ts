import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalRegisterComponent } from './animal-register.component';

describe('RegistroAnimalComponent', () => {
  let component: AnimalRegisterComponent;
  let fixture: ComponentFixture<AnimalRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
