import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyforleaveComponent } from './applyforleave.component';

describe('ApplyforleaveComponent', () => {
  let component: ApplyforleaveComponent;
  let fixture: ComponentFixture<ApplyforleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyforleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyforleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
