import { Component, OnInit, EventEmitter, Input, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { LoginService } from '../../services/Login/login.service';
import { LoginModel } from '../../models/login/login.model';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CommonService } from '../../services/common service/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any;
  userForm: any;
  statusCode: number;
  requestProcessing = false;
  toastMessage: string;
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService) {

    this.userForm = this.formBuilder.group({
      'userid': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
    });

  }

  validate() {
    this.commonService.startLoadingSpinner();
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      control.markAsTouched({ onlySelf: true });

    });
  }
  onLoginFormSubmit() {


    this.preProcessConfigurations();
    if (this.userForm.invalid) {
      return;
    }

    const loginModel = new LoginModel(this.userForm.get('userid').value.trim(), this.userForm.get('password').value.trim());
    localStorage.setItem('userid', this.userForm.get('userid').value.trim());
    this.loginService.post(loginModel).subscribe(data => {
      const code = data.code;
      if (code === 1) {
        this.toastMessage = data.message;
        this.toastMessageDisplay();
      } else if (code === 0) {
        this.toastMessage = data.message;
        this.toastMessageDisplay();
        this.redirectToHomePage();
      }
      const cookie = data.data.value;
      Cookie.set('cookieName', cookie);
      const myCookie = Cookie.get('cookieName');

    });
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  ngOnInit() {
  }

  redirectToHomePage() {
    this.router.navigate(['/home']);
    return true;
  }
  toastMessageDisplay() {
    this.commonService.displayMessage();
  }
  loadingSpinner() {
    this.commonService.startLoadingSpinner();
  }

}
