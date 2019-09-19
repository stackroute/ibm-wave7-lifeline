import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonordashboardreportsComponent } from './donordashboardreports.component';

describe('DonordashboardreportsComponent', () => {
  let component: DonordashboardreportsComponent;
  let fixture: ComponentFixture<DonordashboardreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonordashboardreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonordashboardreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
