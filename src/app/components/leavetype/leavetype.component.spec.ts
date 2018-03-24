import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common/common.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { LeavetypeComponent } from './leavetype.component';
describe('LeavetypeComponent', () => {
  let component: LeavetypeComponent;
  let fixture: ComponentFixture<LeavetypeComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, TranslateModule.forRoot(), HttpModule, HttpClientModule, Ng4LoadingSpinnerModule.forRoot(), AppRoutingModule],
      declarations: [LeavetypeComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LeavetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('userForm invalid when empty', () => {
    
     expect(component.leavetypeForm.valid).toBeFalsy();
   });*/
});
