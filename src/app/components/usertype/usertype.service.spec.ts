import { TestBed, inject } from '@angular/core/testing';

import { UsertypeService } from './usertype.service';

describe('UsertypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsertypeService]
    });
  });

  it('should be created', inject([UsertypeService], (service: UsertypeService) => {
    expect(service).toBeTruthy();
  }));
});
