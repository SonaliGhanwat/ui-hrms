import { TestBed, inject } from '@angular/core/testing';
import { ApprovalsService } from './approvals.service';
xdescribe('ApprovalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprovalsService]
    });
  });
  /*it('should be created', inject([ApprovalsService], (service: ApprovalsService) => {
    expect(service).toBeTruthy();
  }));*/
});
