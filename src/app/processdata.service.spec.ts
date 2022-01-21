import { TestBed } from '@angular/core/testing';

import { ProcessdataService } from './processdata.service';

describe('ProcessdataService', () => {
  let service: ProcessdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
