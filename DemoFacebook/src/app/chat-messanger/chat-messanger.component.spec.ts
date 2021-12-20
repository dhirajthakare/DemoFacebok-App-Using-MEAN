import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessangerComponent } from './chat-messanger.component';

describe('ChatMessangerComponent', () => {
  let component: ChatMessangerComponent;
  let fixture: ComponentFixture<ChatMessangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
