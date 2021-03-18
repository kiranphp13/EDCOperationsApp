import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUserComponent } from './ngx-user.component';

describe('NgxUserComponent', () => {
  let component: NgxUserComponent;
  let fixture: ComponentFixture<NgxUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
