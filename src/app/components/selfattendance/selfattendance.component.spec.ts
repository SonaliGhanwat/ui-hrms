import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfattendanceComponent } from './selfattendance.component';

describe('SelfattendanceComponent', () => {
  let component: SelfattendanceComponent;
  let fixture: ComponentFixture<SelfattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
