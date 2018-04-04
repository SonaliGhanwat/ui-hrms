import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavebalancereportComponent } from './leavebalancereport.component';

describe('LeavebalancereportComponent', () => {
  let component: LeavebalancereportComponent;
  let fixture: ComponentFixture<LeavebalancereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavebalancereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavebalancereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
