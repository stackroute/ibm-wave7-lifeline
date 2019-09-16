import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuestComponent } from './reuest.component';

describe('ReuestComponent', () => {
  let component: ReuestComponent;
  let fixture: ComponentFixture<ReuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
