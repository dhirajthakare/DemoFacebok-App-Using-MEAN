import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerSidebarRightComponent } from './messanger-sidebar-right.component';

describe('MessengerSidebarRightComponent', () => {
  let component: MessengerSidebarRightComponent;
  let fixture: ComponentFixture<MessengerSidebarRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerSidebarRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerSidebarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
