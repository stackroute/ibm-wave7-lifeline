import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MythsComponent } from './myths.component';

describe('MythsComponent', () => {
  let component: MythsComponent;
  let fixture: ComponentFixture<MythsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MythsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MythsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
