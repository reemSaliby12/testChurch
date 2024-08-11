import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthenticatedResponse } from 'src/app/_models/AuthenticatedResponse';
import { UsersService } from 'src/app/_services/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
 {

  currentUser$:Observable<AuthenticatedResponse>;
  loggedUserId : string;
  loggedUserName : string;
  

 constructor(public userservice:UsersService, private router: Router)
 {

 }
  ngOnInit(): void 
  {
    this.userservice.loggedUser$.pipe(
      take(1) 
     ).subscribe(
       res=> {
       this.loggedUserId=res.id;
       this.loggedUserName=res.userName;
       }
     );
     this.currentUser$ = this.userservice.loggedUser$;
     if (this.loggedUserId)
     {
     }
     else
     {
      //this.router.navigate([{ outlets: { mainrouter: [ 'login' ] }}]);
       this.router.navigate(['login']);
     }

  }

  onlogout()
  {
    this.userservice.performlogout();
   // this.router.navigate([{ outlets: { mainrouter: [ 'login' ] }}]);
  this.router.navigate(['login']);
  }
  
  @Output() toggleDropdownEvent = new EventEmitter<void>();
  onToggleDropdown()
  {
    this.toggleDropdownEvent.emit();
  }
}
