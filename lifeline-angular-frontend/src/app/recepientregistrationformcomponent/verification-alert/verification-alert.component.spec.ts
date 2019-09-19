import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationAlertComponent } from './verification-alert.component';

describe('VerificationAlertComponent', () => {
  let component: VerificationAlertComponent;
  let fixture: ComponentFixture<VerificationAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
