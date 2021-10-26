import { TestBed } from '@angular/core/testing';

import { UsermiddlewareService } from './usermiddleware.service';

describe('UsermiddlewareService', () => {
  let service: UsermiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsermiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
