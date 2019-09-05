import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatcomponentComponent } from './chatcomponent.component';

describe('ChatcomponentComponent', () => {
  let component: ChatcomponentComponent;
  let fixture: ComponentFixture<ChatcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
