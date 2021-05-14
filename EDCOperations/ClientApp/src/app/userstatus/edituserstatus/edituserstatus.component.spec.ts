import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserstatusComponent } from './edituserstatus.component';

describe('EdituserstatusComponent', () => {
  let component: EdituserstatusComponent;
  let fixture: ComponentFixture<EdituserstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituserstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
