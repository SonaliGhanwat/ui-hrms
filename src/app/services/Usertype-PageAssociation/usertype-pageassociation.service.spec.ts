import { TestBed, inject } from '@angular/core/testing';

import { UsertypePageassociationService } from './usertype-pageassociation.service';

describe('UsertypePageassociationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsertypePageassociationService]
    });
  });

  it('should be created', inject([UsertypePageassociationService], (service: UsertypePageassociationService) => {
    expect(service).toBeTruthy();
  }));
});
