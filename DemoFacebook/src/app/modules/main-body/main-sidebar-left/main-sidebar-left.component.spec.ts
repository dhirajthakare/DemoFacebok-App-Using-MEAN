import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidebarLeftComponent } from './main-sidebar-left.component';

describe('MainSidebarLeftComponent', () => {
  let component: MainSidebarLeftComponent;
  let fixture: ComponentFixture<MainSidebarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSidebarLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
