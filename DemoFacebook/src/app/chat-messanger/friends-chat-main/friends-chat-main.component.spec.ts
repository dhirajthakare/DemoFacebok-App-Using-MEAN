import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsChatMainComponent } from './friends-chat-main.component';

describe('FriendsChatMainComponent', () => {
  let component: FriendsChatMainComponent;
  let fixture: ComponentFixture<FriendsChatMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsChatMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsChatMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
