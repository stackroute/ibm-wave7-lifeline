import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpagereportsComponent } from './landingpagereports.component';

describe('LandingpagereportsComponent', () => {
  let component: LandingpagereportsComponent;
  let fixture: ComponentFixture<LandingpagereportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingpagereportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpagereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
