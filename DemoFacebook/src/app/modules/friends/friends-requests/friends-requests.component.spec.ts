import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsRequestsComponent } from './friends-requests.component';

describe('FriendsRequestsComponent', () => {
  let component: FriendsRequestsComponent;
  let fixture: ComponentFixture<FriendsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
