import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HolidayService } from '../../services/Holiday/holiday.service';
import { Holiday } from '../../models/Holiday/Holiday.model';
import { CommonService } from '../../services/common/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  allHolidayList: Holiday[];
  statusCode: number;
  requestProcessing = false;
  holidayIdToUpdate = null;
  processValidation = false;
  collection = [];
  toastMessage: string;

  constructor(private commonService: CommonService, private holidayService: HolidayService, private formBuilder: FormBuilder) { }
  holidayForm = this.formBuilder.group({
    'holidayName': ['', ([Validators.required])],
    'holidayDate': ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getAllHolidayList();
    this.commonService.onPreviousNextPage();
  }
  getAllHolidayList() {
    this.commonService.startLoadingSpinner();
    this.holidayService.getAllHolidayList()
      .subscribe(
      data => this.allHolidayList = data,
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  onHolidayFormSubmit() {
    this.preProcessConfigurations();
    this.commonService.startLoadingSpinner();
    const holidayName = this.holidayForm.get('holidayName').value.trim();
    const holidayDate = this.holidayForm.get('holidayDate').value.trim();
    if (this.holidayIdToUpdate === null) {
      const userType = new Holiday(null, holidayName, holidayDate);
      this.holidayService.createHoliday(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.getAllHolidayList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    } else {
      const holiday = new Holiday(this.holidayIdToUpdate, holidayName, holidayDate);
      this.holidayService.updateHoliday(holiday)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllHolidayList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteHoliday(id: string) {
    this.commonService.startLoadingSpinner();
    this.preProcessConfigurations();
    this.holidayService.deleteHolidayById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllHolidayList();
        this.backToCreateArticle();
        this.commonService.hideSpinner();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadHolidayToEdit(id: string) {
    this.preProcessConfigurations();
    this.holidayService.getHolidayById(id)
      .subscribe(holiday => {
        this.holidayIdToUpdate = holiday.id;
        this.holidayForm.setValue({ holidayName: holiday.holidayName, holidayDate: holiday.holidayDate });
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
    this.holidayIdToUpdate = null;
    this.holidayForm.reset();
    this.processValidation = false;
  }
  toastMessageDisplay() {
    this.commonService.displayMessage();
  }

}
