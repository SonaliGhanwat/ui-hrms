import { TestBed, inject } from '@angular/core/testing';

import { AttendanceService } from './attendance.service';

xdescribe('AttendanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendanceService]
    });
  });

  it('should be created', inject([AttendanceService], (service: AttendanceService) => {
    expect(service).toBeTruthy();
  }));
});
