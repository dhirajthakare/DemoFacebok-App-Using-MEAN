import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsChatSideBar1Component } from './friends-chat-side-bar1.component';

describe('FriendsChatSideBar1Component', () => {
  let component: FriendsChatSideBar1Component;
  let fixture: ComponentFixture<FriendsChatSideBar1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsChatSideBar1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsChatSideBar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
