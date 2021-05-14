import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditassociationsComponent } from './editassociations.component';

describe('EditassociationsComponent', () => {
  let component: EditassociationsComponent;
  let fixture: ComponentFixture<EditassociationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditassociationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditassociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
