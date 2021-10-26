import { TestBed } from '@angular/core/testing';

import { StoryManageService } from './story-manage.service';

describe('StoryManageService', () => {
  let service: StoryManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
