import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetuserstatusComponent } from './getuserstatus.component';

describe('GetuserstatusComponent', () => {
  let component: GetuserstatusComponent;
  let fixture: ComponentFixture<GetuserstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetuserstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetuserstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
