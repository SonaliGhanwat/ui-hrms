import { Injectable } from '@angular/core';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Injectable()
export class CommonService {
  collection = [];
  showSelected: boolean;
  constructor(private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }
  onPreviousNextPage() {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  displayMessage() {
    const x = document.getElementById('snackbar');
    x.className = 'show';
    setTimeout(function () { x.className = x.className.replace('show', ''); }, 10000);
  }
  startLoadingSpinner() {
    this.ng4LoadingSpinnerService.show();
    /*setTimeout(function() {
      this.ng4LoadingSpinnerService.hide();
    }.bind(this), 1000);*/
  }
  closeForm() {
    document.getElementById('myModal').click();
  }
  showHideMenu() {
    this.showSelected = false;
  }
  hideSpinner() {
    this.ng4LoadingSpinnerService.hide();
  }

}
