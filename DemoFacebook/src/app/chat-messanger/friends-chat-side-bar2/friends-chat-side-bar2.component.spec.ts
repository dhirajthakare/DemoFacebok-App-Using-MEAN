import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsChatSideBar2Component } from './friends-chat-side-bar2.component';

describe('FriendsChatSideBar2Component', () => {
  let component: FriendsChatSideBar2Component;
  let fixture: ComponentFixture<FriendsChatSideBar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsChatSideBar2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsChatSideBar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
