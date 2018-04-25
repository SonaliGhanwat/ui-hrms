import { TestBed, inject } from '@angular/core/testing';

import { RegularizationService } from './regularization.service';

describe('RegularizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegularizationService]
    });
  });

  it('should be created', inject([RegularizationService], (service: RegularizationService) => {
    expect(service).toBeTruthy();
  }));
});
