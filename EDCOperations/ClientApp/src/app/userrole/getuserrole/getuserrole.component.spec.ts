import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetuserroleComponent } from './getuserrole.component';

describe('GetuserroleComponent', () => {
  let component: GetuserroleComponent;
  let fixture: ComponentFixture<GetuserroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetuserroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetuserroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
