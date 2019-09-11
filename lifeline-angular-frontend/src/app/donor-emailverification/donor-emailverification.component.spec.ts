import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorEmailverificationComponent } from './donor-emailverification.component';

describe('DonorEmailverificationComponent', () => {
  let component: DonorEmailverificationComponent;
  let fixture: ComponentFixture<DonorEmailverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorEmailverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorEmailverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
