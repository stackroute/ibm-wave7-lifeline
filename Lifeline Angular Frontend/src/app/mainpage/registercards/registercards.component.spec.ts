import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistercardsComponent } from './registercards.component';

describe('RegistercardsComponent', () => {
  let component: RegistercardsComponent;
  let fixture: ComponentFixture<RegistercardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistercardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistercardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
