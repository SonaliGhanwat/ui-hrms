import { Component,HostListener,Input, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AppDataService } from './services/app-data/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  @Input() showSelected: any;
  
  constructor(private translate: TranslateService,
  private appData: AppDataService) {
    this.showSelected = false;
    translate.addLangs(['en', 'fr', 'cn', 'hi']);
    translate.setDefaultLang('en');

  }
  ngOnInit() {
    // this.showMenu();
  }

  ngOnDestroy() {
    this.appData.clearAppData();
  }
 
  /*showMenu() {
    if (this.showSelected = false) {
      this.showSelected = true;
    }
  }*/
}
