import { TestBed } from '@angular/core/testing';

import { CreateloginserviceService } from './createloginservice.service';

describe('CreateloginserviceService', () => {
  let service: CreateloginserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateloginserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
