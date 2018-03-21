
import { Component, OnInit ,Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsertypeService } from '../../services/UserType/usertype.service';
import { UserType } from '../../models/UserType/UserType.model';
import {Http} from '@angular/http';
import {CommonService} from '../../services/common service/common.service';
@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.css']
})
export class UsertypeComponent implements OnInit {
  allUsertypes: UserType[];
  statusCode: number;
  requestProcessing = false;
  userTypeIdToUpdate = null;
  processValidation = false;
  toastMessage:string;
  UserType = 'usertypeName';
  // isError:boolean = false;
  constructor(private commonService:CommonService, private usertypeService: UsertypeService, private formBuilder: FormBuilder) { }
  usertypeForm = this.formBuilder.group({
    'usertypeName': ['', ([Validators.required])],
    'description': ['', [Validators.required]],
  });
  ngOnInit(): void {
    this.getAllUserTypes();
    this.commonService.onPreviousNextPage();
  }
  getAllUserTypes() {
    this.usertypeService.getAllUserTypes()
      .subscribe(
      data => this.allUsertypes = data,
      errorCode => this.statusCode = errorCode);
  }
  onUserTypeFormSubmit() {
    this.preProcessConfigurations();
    const usertypeName = this.usertypeForm.get('usertypeName').value.trim();
    const description = this.usertypeForm.get('description').value.trim();
    if (this.userTypeIdToUpdate === null) {
      const userType = new UserType(null, usertypeName, description);
      this.usertypeService.createUserType(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllUserTypes();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    } else {
      const userType = new UserType(this.userTypeIdToUpdate, usertypeName, description);
      this.usertypeService.updateUserType(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllUserTypes();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteUserType(id: string) {
    this.preProcessConfigurations();
    this.usertypeService.deleteUserTypeById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllUserTypes();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);
  }
  loadUserTypeToEdit(id: string) {
    this.preProcessConfigurations();
    this.usertypeService.getUserTypeById(id)
      .subscribe(userType => {
        this.userTypeIdToUpdate = userType.id;
        this.usertypeForm.setValue({ usertypeName: userType.usertypeName, description: userType.description });
        console.log('usertypeName', userType.usertypeName);
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  backToCreateArticle() {
    this.userTypeIdToUpdate = null;
    this.usertypeForm.reset();
    this.processValidation = false;
  }
  toastMessageDisplay() {
    this.commonService.displayMessage();
   }
}

