import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HolidayService } from '../../services/Holiday/holiday.service';
import { Holiday } from '../../models/Holiday/Holiday.model';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  allHolidayList: Holiday[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;

  constructor(private holidayService: HolidayService, private formBuilder: FormBuilder) { }
  holidayForm   = this.formBuilder.group({
    'holidayName': ['',([Validators.required])],
    'holidayDate': ['', [Validators.required]],


  });

  ngOnInit(): void {
    this.getAllHolidayList();
  }
  getAllHolidayList() {
    this.holidayService.getAllHolidayList()
      .subscribe(
      data => this.allHolidayList = data,
      errorCode => this.statusCode = errorCode);
  }
  onHolidayFormSubmit() {
    this.preProcessConfigurations();
    let holidayName = this.holidayForm.get('holidayName').value.trim();
    let holidayDate = this.holidayForm.get('holidayDate').value.trim();
    if (this.articleIdToUpdate === null) {

      let userType = new Holiday(null, holidayName, holidayDate);
      this.holidayService.createHoliday(userType)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllHolidayList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
      console.log("successCode");
    } else {
      //Handle update article
      let holiday = new Holiday(this.articleIdToUpdate, holidayName, holidayDate);
      this.holidayService.updateHoliday(holiday)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllHolidayList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteHoliday(id: string) {
    this.preProcessConfigurations();
    this.holidayService.deleteHolidayById(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllHolidayList();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadHolidayToEdit(id: string) {
    this.preProcessConfigurations();
    this.holidayService.getHolidayById(id)
      .subscribe(holiday => {

        this.articleIdToUpdate = holiday.id;
        this.holidayForm.setValue({ holidayName: holiday.holidayName, holidayDate: holiday.holidayDate });
        console.log("usertypeName", holiday.holidayName);
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
    this.articleIdToUpdate = null;
    this.holidayForm.reset();
    this.processValidation = false;
  }


}
