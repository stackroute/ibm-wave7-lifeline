import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganRequestStatusComponent } from './organ-request-status.component';

describe('OrganRequestStatusComponent', () => {
  let component: OrganRequestStatusComponent;
  let fixture: ComponentFixture<OrganRequestStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganRequestStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
