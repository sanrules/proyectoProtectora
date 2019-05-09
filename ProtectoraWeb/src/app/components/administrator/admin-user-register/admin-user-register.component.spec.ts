import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserRegisterComponent } from './admin-user-register.component';

describe('AdminUserRegisterComponent', () => {
  let component: AdminUserRegisterComponent;
  let fixture: ComponentFixture<AdminUserRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
