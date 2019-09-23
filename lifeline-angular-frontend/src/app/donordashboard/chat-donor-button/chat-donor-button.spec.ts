import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatButton } from './chat-donor-button';

describe('ChatButton', () => {
  let component: ChatButton;
  let fixture: ComponentFixture<ChatButton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatButton ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
