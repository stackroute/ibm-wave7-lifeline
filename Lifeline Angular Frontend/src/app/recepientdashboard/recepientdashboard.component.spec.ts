import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepientdashboardComponent } from './recepientdashboard.component';

describe('RecepientdashboardComponent', () => {
  let component: RecepientdashboardComponent;
  let fixture: ComponentFixture<RecepientdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepientdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepientdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
