import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, DebugElement} from "@angular/core";
import { LoginComponent } from './login.component';
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitElement: DebugElement;
  //let loginElement: DebugElement;
  //let passwordElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitElement = fixture.debugElement.query(By.css('button'));
    //loginElement = fixture.debugElement.query(By.css('input[type=text]'));
    //passwordElement = fixture.debugElement.query(By.css('input[type=password]'));
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Setting enabled to false disabled the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();

    //Expected outcome
    expect(submitElement.nativeElement.disabled).toBeTruthy();
  });
  it('Setting enabled to true enables the submit button', () => {
    component.enabled = true;
    fixture.detectChanges();

    //Expected outcome
    expect(submitElement.nativeElement.disabled).toBeFalsy();
  });
});
