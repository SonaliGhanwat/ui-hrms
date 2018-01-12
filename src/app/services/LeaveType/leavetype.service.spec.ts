import { TestBed, inject } from '@angular/core/testing';

import { LeavetypeService } from './leavetype.service';

describe('LeavetypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeavetypeService]
    });
  });

  it('should be created', inject([LeavetypeService], (service: LeavetypeService) => {
    expect(service).toBeTruthy();
  }));
});
