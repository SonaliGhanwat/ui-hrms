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
  pageIdToUpdate = null;
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
      data => this.allPage = data.data);
    this.commonService.hideSpinner();
  }
  onPgeFormSubmit() {
    this.commonService.startLoadingSpinner();
    const menu = this.pageForm.get('menu').value;
    const pageName = this.pageForm.get('pageName').value;
    const submenu = this.pageForm.get('submenu').value;
    const url = this.pageForm.get('url').value;
    const description = this.pageForm.get('description').value;
    if (this.pageIdToUpdate === null) {
      const page = new PageModel(null, menu, pageName, submenu, url, description);
      this.pageService.createPage(page)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.pageForm.reset();
          this.getAllPages();
        }, );
    } else {
      const page = new PageModel(this.pageIdToUpdate, menu, pageName, submenu, url, description);
      this.pageService.updatePage(page)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.pageForm.reset();
          this.getAllPages();
        }, );
    }
  }
  deletePage(id: string) {
    this.commonService.startLoadingSpinner();
    this.pageService.deletePage(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.messag;
        this.getAllPages();
        this.commonService.hideSpinner();
      }, );
  }
  loadPageToEdit(id: string) {
    this.pageService.getPageById(id)
      .subscribe(page => {
        for (let i = 0; i < page.data.length; i++) {
          this.pageIdToUpdate = page.data[i].id;
          this.pageForm.setValue({ menu: page.data[i].menu, submenu: page.data[i].submenu, url: page.data[i].url, pageName: page.data[i].pageName, description: page.data[i].description });
        }
      }, );
  }

  displayToastMessage() {
    this.commonService.displayMessage();
  }
}
