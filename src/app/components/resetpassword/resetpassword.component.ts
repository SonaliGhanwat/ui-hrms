import { Component, OnInit ,EventEmitter,Input, Output,} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { LoginService } from '../../services/Login/login.service';
import { LoginModel } from '../../models/login/login.model';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import{CommonService} from '../../services/common service/common.service'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  data:any;
  userForm: any;
  statusCode: number;
  requestProcessing = false;
  toastMessage :string


  constructor(private commonService:CommonService,private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService) {

    this.userForm = this.formBuilder.group({
      'userid': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
    });
   
  }
 
  validate(){
    Object.keys(this.userForm.controls).forEach(field => { 
      const control = this.userForm.get(field);            
      control.markAsTouched({ onlySelf: true });   
      
    });
  }
  onResetPasswordFormSubmit() {

  
    this.preProcessConfigurations();
    let userid = this.userForm.get('userid').value.trim();
    let password = this.userForm.get('password').value.trim();
    let loginModel = new LoginModel(userid, password);
    //this.loggedIn.emit(new LoginModel(userid, password));
    console.log("loginModel:",loginModel);
    localStorage.setItem("userid", userid);
    this.loginService.resetPasswordPost(loginModel).subscribe(data => {
      console.log("data:",data);
     
      let message = data.message;
      console.log("message:",message);
       this.toastMessage = message;
       let code = data.code;
       if(code===1){
        this.toastMessage = message;
        this.toastMessageDisplay()   
       }else if(code===0){
        this.toastMessage = message;
        this.toastMessageDisplay()   
        this.resetForm();
        //this.redirectToLoginPage();
       }
      
    });
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  ngOnInit() {
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
    return true;
  }
  toastMessageDisplay(){
    this.commonService.displayMessage();
   }
   resetForm() {
   
    this.userForm.reset();
    
  }
}