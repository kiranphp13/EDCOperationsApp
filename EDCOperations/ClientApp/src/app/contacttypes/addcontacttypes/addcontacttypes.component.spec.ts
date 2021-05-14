import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontacttypesComponent } from './addcontacttypes.component';

describe('AddcontacttypesComponent', () => {
  let component: AddcontacttypesComponent;
  let fixture: ComponentFixture<AddcontacttypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcontacttypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontacttypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
