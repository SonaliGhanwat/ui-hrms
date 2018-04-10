import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeaveapplicationComponent } from './my-leaveapplication.component';

describe('MyLeaveapplicationComponent', () => {
  let component: MyLeaveapplicationComponent;
  let fixture: ComponentFixture<MyLeaveapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLeaveapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLeaveapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
