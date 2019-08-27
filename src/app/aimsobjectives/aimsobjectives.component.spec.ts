import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimsobjectivesComponent } from './aimsobjectives.component';

describe('AimsobjectivesComponent', () => {
  let component: AimsobjectivesComponent;
  let fixture: ComponentFixture<AimsobjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimsobjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimsobjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
