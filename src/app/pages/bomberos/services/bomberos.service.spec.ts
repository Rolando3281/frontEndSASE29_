import { TestBed } from '@angular/core/testing';

import { BomberosService } from './bomberos.service';

describe('BomberosService', () => {
  let service: BomberosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BomberosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
