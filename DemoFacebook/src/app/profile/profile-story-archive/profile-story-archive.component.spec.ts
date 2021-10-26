import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStoryArchiveComponent } from './profile-story-archive.component';

describe('ProfileStoryArchiveComponent', () => {
  let component: ProfileStoryArchiveComponent;
  let fixture: ComponentFixture<ProfileStoryArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStoryArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStoryArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
