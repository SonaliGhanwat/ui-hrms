import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from '../../services/Page/page.service';
import { PageModel } from '../../models/Page/page.model';
import { PageAssociation } from '../../models/UserType-Pageassociation/UserType-PageAsso.model';
import { UsertypeService } from '../../services/UserType/usertype.service';
import { UserType } from '../../models/UserType/UserType.model';
import { UsertypePageassociationService } from '../../services/Usertype-PageAssociation/usertype-pageassociation.service';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'app-usertype-pageassociation',
  templateUrl: './usertype-pageassociation.component.html',
  styleUrls: ['./usertype-pageassociation.component.css']
})
export class UsertypePageassociationComponent implements OnInit {
  allPage: PageModel[];
  allUsertypes: UserType[];
  allPageAssoList: PageAssociation[]
  statusCode: number;
  requestProcessing = false;
  leaveTypeIdToUpdate = null;
  processValidation = false;
  leaveIdToUpdate = null;
  collection = [];
  toastMessage: string;
  pageAssoIdData:PageAssociation[]
  constructor(private formBuilder: FormBuilder,private commonService: CommonService, private pageService: PageService,private usertypeService: UsertypeService,private usertypePageassociationService: UsertypePageassociationService) { }
  pageAssoForm = this.formBuilder.group({
    'usertype': ['', ([Validators.required])],
    'page': ['', ([Validators.required])],
   
  });
  ngOnInit() {
    this.getAllUserTypePageAssoList();
    this.getAllPages();
    this.getAllUserTypes();
  }


  getAllUserTypePageAssoList() {
    this.commonService.startLoadingSpinner();
    this.usertypePageassociationService.getAllUserTypePageAssoList()
      .subscribe(
      data => this.allPageAssoList = data.data,
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  getAllPages() {
    this.commonService.startLoadingSpinner();
    this.pageService.getAllPageList()
      .subscribe(
      data => this.allPage = data.data,
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  getAllUserTypes() {
    this.commonService.startLoadingSpinner();
    this.usertypeService.getAllUserTypes()
      .subscribe(
      data => this.allUsertypes = data,
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  onPageAssoFormSubmit() {
    this.preProcessConfigurations();
    this.commonService.startLoadingSpinner();
    const usertypeId = this.pageAssoForm.get('usertype').value;
    const page = this.pageAssoForm.get('page').value;
   
    if (this.leaveIdToUpdate === null) {
      const attendance = new PageAssociation(null, usertypeId, page);
      this.usertypePageassociationService.createPageAssoList(attendance)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
         
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    } else {
      const userType = new PageAssociation(this.leaveIdToUpdate, page, usertypeId);
      this.usertypePageassociationService.updatePageAsso(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
   
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  addPage(){
    const id = ((document.getElementById('page') as HTMLInputElement).value);
    this.pageService.getPageByIdList(id)
    .subscribe(
      data => this.pageAssoIdData = data.data,
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  backToCreateArticle() {
    this.leaveIdToUpdate = null;
    this.pageAssoForm.reset();
    this.processValidation = false;
  }
  toastMessageDisplay() {
    this.commonService.displayMessage();
  }
}
