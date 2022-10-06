import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessangerSidebarLeftComponent } from './messanger-sidebar-left.component';

describe('MessangerSidebarLeftComponent', () => {
  let component: MessangerSidebarLeftComponent;
  let fixture: ComponentFixture<MessangerSidebarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessangerSidebarLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessangerSidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
