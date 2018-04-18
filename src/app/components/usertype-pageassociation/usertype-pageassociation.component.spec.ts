import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypePageassociationComponent } from './usertype-pageassociation.component';

describe('UsertypePageassociationComponent', () => {
  let component: UsertypePageassociationComponent;
  let fixture: ComponentFixture<UsertypePageassociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypePageassociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypePageassociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
