import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddassociationsComponent } from './addassociations.component';

describe('AddassociationsComponent', () => {
  let component: AddassociationsComponent;
  let fixture: ComponentFixture<AddassociationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddassociationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddassociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
