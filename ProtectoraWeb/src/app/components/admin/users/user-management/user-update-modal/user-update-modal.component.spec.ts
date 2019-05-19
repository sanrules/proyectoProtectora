import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateModalComponent } from './user-update-modal.component';

describe('UserUpdateModalComponent', () => {
  let component: UserUpdateModalComponent;
  let fixture: ComponentFixture<UserUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
