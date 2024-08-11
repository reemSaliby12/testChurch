import { Component } from '@angular/core';
import { navbarData } from './nav-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
collapsed=false;
navData=navbarData;
isMenueButton = false;
isActive: boolean = false;

toggleSidebar() {
  this.isActive = !this.isActive;
}

/*toggleSidebar() {
 /* this.isActive = !this.isActive;
  if (!this.isActive){

    this.isMenueButton= false;
  }else{
    this.isMenueButton= true;
  }

}*/

}
