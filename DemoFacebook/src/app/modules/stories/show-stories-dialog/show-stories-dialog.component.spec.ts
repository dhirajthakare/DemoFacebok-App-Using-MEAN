import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStoriesDialogComponent } from './show-stories-dialog.component';

describe('ShowStoriesDialogComponent', () => {
  let component: ShowStoriesDialogComponent;
  let fixture: ComponentFixture<ShowStoriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowStoriesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
