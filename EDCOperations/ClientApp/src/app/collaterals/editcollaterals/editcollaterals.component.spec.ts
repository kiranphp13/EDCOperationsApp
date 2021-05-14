import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcollateralsComponent } from './editcollaterals.component';

describe('EditcollateralsComponent', () => {
  let component: EditcollateralsComponent;
  let fixture: ComponentFixture<EditcollateralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcollateralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcollateralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
