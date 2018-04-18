import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from '../../services/Page/page.service';
import { PageModel } from '../../models/Page/page.model';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  allPage: PageModel[];
  statusCode: number;
  requestProcessing = false;
  leaveTypeIdToUpdate = null;
  processValidation = false;
  leaveIdToUpdate = null;
  collection = [];
  toastMessage: string;
  constructor(private commonService: CommonService, private pageService: PageService, private formBuilder: FormBuilder) { }
  pageForm = this.formBuilder.group({
    'menu': ['', ([Validators.required])],
    'pageName': ['', ([Validators.required])],
    'submenu': ['', ([Validators.required])],
    'url': ['', ([Validators.required])],
    'description': ['', ([Validators.required])]
  });
  ngOnInit(): void {
    this.getAllPages();
    this.commonService.onPreviousNextPage();
  }
  getAllPages() {
    this.commonService.startLoadingSpinner();
    this.pageService.getAllPageList()
      .subscribe(
      data => this.allPage = data.data,
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  onPgeFormSubmit() {
    this.preProcessConfigurations();
    this.commonService.startLoadingSpinner();
    const menu = this.pageForm.get('menu').value;
    const pageName = this.pageForm.get('pageName').value;
    const submenu = this.pageForm.get('submenu').value;
    const url = this.pageForm.get('url').value;
    const description = this.pageForm.get('description').value;
    if (this.leaveIdToUpdate === null) {
      const attendance = new PageModel(null, menu, pageName, submenu, url,description);
      this.pageService.createPage(attendance)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
         
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    } else {
      const userType = new PageModel(this.leaveIdToUpdate, menu, pageName, submenu, url,description);
      this.pageService.updatePage(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
   
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deletePage(id: string) {
    this.commonService.startLoadingSpinner();
    this.preProcessConfigurations();
    this.pageService.deletePage(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.messag;
        this.getAllPages();
        this.backToCreateArticle();
        this.commonService.hideSpinner();
      },
      errorCode => this.statusCode = errorCode);
  }
  loadPageToEdit(id: string) {
    this.preProcessConfigurations();
    this.pageService.getPageById(id)
      .subscribe(page => {
        for (var i = 0; i < page.data.length; i++) {
        this.leaveTypeIdToUpdate = page.data[i].id;
        this.pageForm.setValue({ menu: page.data[i].menu, submenu: page.data[i].submenu, url: page.data[i].url, pageName: page.data[i].pageName, description: page.data[i].description});
        this.processValidation = true;
        this.requestProcessing = false;
        }
      },
      errorCode => this.statusCode = errorCode);
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  backToCreateArticle() {
    this.leaveIdToUpdate = null;
    this.pageForm.reset();
    this.processValidation = false;
  }
  toastMessageDisplay() {
    this.commonService.displayMessage();
  }
}
