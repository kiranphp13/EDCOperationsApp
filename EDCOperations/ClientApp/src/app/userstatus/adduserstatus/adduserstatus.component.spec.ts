import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserstatusComponent } from './adduserstatus.component';

describe('AdduserstatusComponent', () => {
  let component: AdduserstatusComponent;
  let fixture: ComponentFixture<AdduserstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
