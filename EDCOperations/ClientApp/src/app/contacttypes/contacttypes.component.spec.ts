import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacttypesComponent } from './contacttypes.component';

describe('ContacttypesComponent', () => {
  let component: ContacttypesComponent;
  let fixture: ComponentFixture<ContacttypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContacttypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContacttypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
