import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontacttypesComponent } from './editcontacttypes.component';

describe('EditcontacttypesComponent', () => {
  let component: EditcontacttypesComponent;
  let fixture: ComponentFixture<EditcontacttypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcontacttypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontacttypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
