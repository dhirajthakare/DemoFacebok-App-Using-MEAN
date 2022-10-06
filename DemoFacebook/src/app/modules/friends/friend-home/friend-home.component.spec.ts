import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendHomeComponent } from './friend-home.component';

describe('FriendHomeComponent', () => {
  let component: FriendHomeComponent;
  let fixture: ComponentFixture<FriendHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
