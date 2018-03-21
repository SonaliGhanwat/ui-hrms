import { Component, OnInit, EventEmitter, Input, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { LoginService } from '../../services/Login/login.service';
import { LoginModel } from '../../models/login/login.model';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonService } from '../../services/common service/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  data: any;
  userForm: FormGroup;
  statusCode: number;
  requestProcessing = false;
  toastMessage: string;
  @Output() loggedIn = new EventEmitter<LoginModel>();
  @Input() enabled = true;
  constructor(private ng4LoadingSpinnerService: Ng4LoadingSpinnerService, private commonService: CommonService, private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService) { }
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userid: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
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
    this.commonService.startLoadingSpinner();
    const loginModel = new LoginModel(this.userForm.get('userid').value.trim(), this.userForm.get('password').value.trim());
    localStorage.setItem('userid', this.userForm.get('userid').value.trim());
    this.loginService.post(loginModel).subscribe(data => {
      const code = data.code;
      if (code === 1) {
        this.toastMessage = data.message;
        document.getElementById('userid_validation').innerHTML = data.message;
        document.getElementById('userid').style.borderColor = 'red';
        this.toastMessageDisplay();
        this.commonService.startLoadingSpinner();
      } else if (code === 2) {
        document.getElementById('password_validation').innerHTML = data.message;
        document.getElementById('password').style.borderColor = 'red';
        this.toastMessage = data.message;
        this.toastMessageDisplay();
        this.commonService.startLoadingSpinner();
      } else if (code === 0) {
        this.commonService.startLoadingSpinner();
        this.redirectToHomePage();
      }
      const cookie = data.data.value;
      Cookie.set('cookieName', cookie);
      const myCookie = Cookie.get('cookieName');
      this.commonService.startLoadingSpinner();
    });
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
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
  validation() {
    document.getElementById('userid').style.borderColor = '';
    document.getElementById('userid_validation').innerHTML = '';
    document.getElementById('password_validation').innerHTML = '';
    document.getElementById('password').style.borderColor = '';
  }
  /*preventNumbers() {
    console.log(this.userForm.get('userid').value.trim().keyCode);
    if (this.userForm.get('userid').value.trim().keyCode >= 32 && this.userForm.get('userid').value.trim().keyCode <= 47) {
      document.getElementById('userid_validation').innerHTML = "Do not Enter Special Character"
      return false;
    }
  }*/
}
