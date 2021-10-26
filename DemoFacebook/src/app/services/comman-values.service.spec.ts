import { TestBed } from '@angular/core/testing';

import { CommanValuesService } from './comman-values.service';

describe('CommanValuesService', () => {
  let service: CommanValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommanValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
