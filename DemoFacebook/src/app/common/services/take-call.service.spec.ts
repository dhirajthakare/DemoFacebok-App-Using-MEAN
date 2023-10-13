import { TestBed } from '@angular/core/testing';

import { TakeCallService } from './take-call.service';

describe('TakeCallService', () => {
  let service: TakeCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakeCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
