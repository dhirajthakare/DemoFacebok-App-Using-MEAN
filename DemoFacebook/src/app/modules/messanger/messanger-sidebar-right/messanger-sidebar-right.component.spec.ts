import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessangerSidebarRightComponent } from './messanger-sidebar-right.component';

describe('MessangerSidebarRightComponent', () => {
  let component: MessangerSidebarRightComponent;
  let fixture: ComponentFixture<MessangerSidebarRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessangerSidebarRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessangerSidebarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
