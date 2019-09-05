import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportgenerationComponent } from './reportgeneration.component';

describe('ReportgenerationComponent', () => {
  let component: ReportgenerationComponent;
  let fixture: ComponentFixture<ReportgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
