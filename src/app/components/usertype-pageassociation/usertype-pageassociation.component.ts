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
export class UsertypePageAssociationComponent implements OnInit {
  allPage: PageModel[];
  allUsertypes: UserType[];
  allPageAssoList: PageAssociation[];
  pageAssoIdToUpdate = null;
  collection = [];
  toastMessage: string;
  pageAssoIdData: string[] = [];
  pageName: any;
  checked: string[] = [];
  log: any;
  logvalue = '';
  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private pageService: PageService, private usertypeService: UsertypeService, private usertypePageassociationService: UsertypePageassociationService) { }
  pageAssoForm = this.formBuilder.group({
    'usertype': ['', ([Validators.required])],
    'page': ['', ([Validators.required])],

  });
  ngOnInit() {
    this.getAllUserTypePageAssoList();
    this.getAllPages();
    this.getAllUserTypes();
    this.commonService.onPreviousNextPage();
  }


  getAllUserTypePageAssoList() {
    this.commonService.startLoadingSpinner();
    this.usertypePageassociationService.getAllUserTypePageAssoList()
      .subscribe(
      data => this.allPageAssoList = data.data, );
    this.commonService.hideSpinner();
  }
  getAllPages() {
    this.commonService.startLoadingSpinner();
    this.pageService.getAllPageList()
      .subscribe(
      data => this.allPage = data.data, );
    this.commonService.hideSpinner();
  }
  getAllUserTypes() {
    this.commonService.startLoadingSpinner();
    this.usertypeService.getAllUserTypes()
      .subscribe(
      data => this.allUsertypes = data, );
    this.commonService.hideSpinner();
  }
  onPageAssoFormSubmit() {
    this.commonService.startLoadingSpinner();
    const usertype = this.pageAssoForm.get('usertype').value;
    const usertypeId = parseInt(usertype);
    const check = ` ${this.logvalue}`;
   
    const userTypePageAssoParts = JSON.parse(check);
    console.log('UserTypePageAssoPart:', userTypePageAssoParts);

    if (this.pageAssoIdToUpdate === null) {
      const pageAssociation = new PageAssociation(null, usertypeId, userTypePageAssoParts);
      this.usertypePageassociationService.createPageAssoList(pageAssociation)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.getAllUserTypePageAssoList();
          this.pageAssoForm.reset();
          this.commonService.closeForm();
        }, );
    } else {
      const pageAssociation = new PageAssociation(this.pageAssoIdToUpdate, usertypeId, userTypePageAssoParts);
      this.usertypePageassociationService.updatePageAsso(pageAssociation)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllUserTypePageAssoList();
          this.pageAssoForm.reset();
          this.commonService.closeForm();
        }, );
    }
  }
  deletePageAsso(id: string) {
    this.commonService.startLoadingSpinner();
    this.usertypePageassociationService.deletePageAsso(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.messag;
        this.getAllUserTypePageAssoList();
        this.commonService.hideSpinner();
      }, );
  }
  loadPageAssoToEdit(id: string) {
    this.usertypePageassociationService.getPageAssoById(id)
      .subscribe(page => {
        this.pageAssoIdToUpdate = page.data.id;
        this.pageAssoForm.setValue({ usertype: page.data.usertypeId.id, page: page.data.page.id });
      }, );
  }
  addPage() {
    const id = ((document.getElementById('page') as HTMLInputElement).value);
    const logid = parseInt(id);
    for (let i = 0; i < this.allPage.length; i++) {
      if (this.allPage[i].id === logid) {
        this.log = this.allPage[i].id;
        this.pageAssoIdData.push(this.allPage[i].pageName);
        console.log('this.log:', this.pageAssoIdData);
        this.log = this.allPage[i].id;
        console.log('this.log:', this.log);
        this.logvalue += `[{'pageId':  ${this.log}}]`;
         console.log("UserTypePageAssoPart:", this.logvalue)
      }
    }
  }
  clearForm(){
    this.pageAssoForm.reset();
  }
  displayToastMessage() {
    this.commonService.displayMessage();
  }
}
