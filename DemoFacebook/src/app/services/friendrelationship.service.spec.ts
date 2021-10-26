import { TestBed } from '@angular/core/testing';

import { FriendrelationshipService } from './friendrelationship.service';

describe('FriendrelationshipService', () => {
  let service: FriendrelationshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendrelationshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
