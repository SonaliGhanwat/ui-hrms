
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsertypeService } from '../../services/UserType/usertype.service';
import { UserType } from '../../models/UserType/UserType.model';
import {Http} from '@angular/http';
import {CommonService} from '../../services/common/common.service';
@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.css']
})
export class UsertypeComponent implements OnInit {
  allUsertypes: UserType[];
  userTypeIdToUpdate = null;
  processValidation = false;
  toastMessage:string;
  UserType = 'usertypeName';
  usertypeForm:FormGroup;
  // isError:boolean = false;
  @Output() loggedIn = new EventEmitter<UserType>();
  @Input() enabled = true;
  constructor(private commonService:CommonService, private usertypeService: UsertypeService, private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    this.usertypeForm = this.formBuilder.group({
      'usertypeName': ['', ([Validators.required])],
      'description': ['', [Validators.required]],
    });
    this.getAllUserTypes();
    this.commonService.onPreviousNextPage();
 
  }
  getAllUserTypes() {
    this.commonService.startLoadingSpinner();
    this.usertypeService.getAllUserTypes()
      .subscribe(
      data => this.allUsertypes = data,);
      this.commonService.hideSpinner();
  }
  onUserTypeFormSubmit() {
    this.commonService.startLoadingSpinner();
    const usertypeName = this.usertypeForm.get('usertypeName').value.trim();
    const description = this.usertypeForm.get('description').value.trim();
    if (this.userTypeIdToUpdate === null) {
      const userType = new UserType(null, usertypeName, description);
      this.loggedIn.emit(new UserType(null,usertypeName, description));
      this.usertypeService.createUserType(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.getAllUserTypes();
          this.usertypeForm.reset();
        
        },);
    } else {
      const userType = new UserType(this.userTypeIdToUpdate, usertypeName, description);
      this.usertypeService.updateUserType(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllUserTypes();
          this.usertypeForm.reset();
        },);
    }
  }
  deleteUserType(id: string) {
    this.commonService.startLoadingSpinner();
    this.usertypeService.deleteUserTypeById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllUserTypes();
        this.commonService.hideSpinner();
      },);
  }
  loadUserTypeToEdit(id: string) {
    this.usertypeService.getUserTypeById(id)
      .subscribe(userType => {
        this.userTypeIdToUpdate = userType.id;
        this.usertypeForm.setValue({ usertypeName: userType.usertypeName, description: userType.description });
        console.log('usertypeName', userType.usertypeName);
      },);
  }
  
  displayToastMessage() {
    this.commonService.displayMessage();
   }
}

