import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  collection = [];
  constructor() { }

  onPreviousNextPage(){
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`attendance ${i}`);
    }
  }
  displayMessage() {
    let x = document.getElementById("snackbar")
     x.className = "show";
     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
  }
}
