import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetassociationsComponent } from './getassociations.component';

describe('GetassociationsComponent', () => {
  let component: GetassociationsComponent;
  let fixture: ComponentFixture<GetassociationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetassociationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetassociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
