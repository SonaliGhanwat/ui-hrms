import { TestBed, inject } from '@angular/core/testing';

import { EmployeetypeService } from './employeetype.service';

describe('EmployeetypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeetypeService]
    });
  });

  it('should be created', inject([EmployeetypeService], (service: EmployeetypeService) => {
    expect(service).toBeTruthy();
  }));
});
