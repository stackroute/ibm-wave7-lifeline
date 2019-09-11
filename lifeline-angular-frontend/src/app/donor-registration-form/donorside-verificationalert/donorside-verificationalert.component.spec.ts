import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsideVerificationalertComponent } from './donorside-verificationalert.component';

describe('DonorsideVerificationalertComponent', () => {
  let component: DonorsideVerificationalertComponent;
  let fixture: ComponentFixture<DonorsideVerificationalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorsideVerificationalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorsideVerificationalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
