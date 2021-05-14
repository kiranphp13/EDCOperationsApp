import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcollateralsComponent } from './addcollaterals.component';

describe('AddcollateralsComponent', () => {
  let component: AddcollateralsComponent;
  let fixture: ComponentFixture<AddcollateralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcollateralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcollateralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
