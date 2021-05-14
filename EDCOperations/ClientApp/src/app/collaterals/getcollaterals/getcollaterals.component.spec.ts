import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcollateralsComponent } from './getcollaterals.component';

describe('GetcollateralsComponent', () => {
  let component: GetcollateralsComponent;
  let fixture: ComponentFixture<GetcollateralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetcollateralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcollateralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
