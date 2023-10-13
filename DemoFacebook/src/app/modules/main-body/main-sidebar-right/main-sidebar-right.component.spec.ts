import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidebarRightComponent } from './main-sidebar-right.component';

describe('MainSidebarRightComponent', () => {
  let component: MainSidebarRightComponent;
  let fixture: ComponentFixture<MainSidebarRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSidebarRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSidebarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
