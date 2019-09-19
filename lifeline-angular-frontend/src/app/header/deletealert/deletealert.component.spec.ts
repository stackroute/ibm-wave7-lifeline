import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletealertComponent } from './deletealert.component';

describe('DeletealertComponent', () => {
  let component: DeletealertComponent;
  let fixture: ComponentFixture<DeletealertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletealertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletealertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
