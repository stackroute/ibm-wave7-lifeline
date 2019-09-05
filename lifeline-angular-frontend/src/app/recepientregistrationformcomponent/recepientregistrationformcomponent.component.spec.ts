import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepientregistrationformcomponentComponent } from './recepientregistrationformcomponent.component';

describe('RecepientregistrationformcomponentComponent', () => {
  let component: RecepientregistrationformcomponentComponent;
  let fixture: ComponentFixture<RecepientregistrationformcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepientregistrationformcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepientregistrationformcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
