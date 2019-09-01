import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorRegistrationFormComponent } from './donor-registration-form.component';

describe('DonorRegistrationFormComponent', () => {
  let component: DonorRegistrationFormComponent;
  let fixture: ComponentFixture<DonorRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
