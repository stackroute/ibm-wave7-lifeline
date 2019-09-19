import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBox } from './chat-box';

describe('ChatBox', () => {
  let component: ChatBox;
  let fixture: ComponentFixture<ChatBox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBox ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
