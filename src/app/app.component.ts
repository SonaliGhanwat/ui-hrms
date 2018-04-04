import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSelected: any;
  constructor(private translate: TranslateService) {
    this.showSelected = false;
    translate.addLangs(['en', 'fr', 'cn', 'hi']);
    translate.setDefaultLang('en');

  }
  ngOnInit() {
    // this.showMenu();
  }

  /*showMenu() {
    if (this.showSelected = false) {
      this.showSelected = true;
    }
  }*/
}
