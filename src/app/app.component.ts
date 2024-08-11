import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { ChurchService } from './_services/church.service';
import { DataService } from './_services/data.service';
import { AuthenticatedResponse } from './_models/AuthenticatedResponse';
import { UsersService } from './_services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('dropdownContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  dropdownRef: ComponentRef<ListComponent>;
  title = 'my-work';

  constructor(private resolver:ComponentFactoryResolver,private churchService :ChurchService,
    private dataService:DataService,private userservice:UsersService ,
    private router:Router
    ) {}


  ngOnInit(): void 
  
  {
    this.setCurrentUser();
    this.get_churches();
    
   // this.router.navigate([{ outlets: { mainrouter: [ 'header' ] }}]);
   // this.router.navigate(['header']);
  }

  get_churches()
  {
    this.churchService.getChurches().subscribe(res=>
      {
        this.dataService.fillChurches(res);
      }
      ,error=>
      {
        console.log("Get Churches Error: "+error);
      }
      );
  }
  

  setCurrentUser()
  {
     const user : AuthenticatedResponse =JSON.parse(sessionStorage.getItem('user'));
    
     if (user)
     {
      
        this.userservice.setCurrentUser(user);
     }
  }


  toggleDropdown() {
 
    if (this.dropdownRef) {
      this.dropdownRef.destroy();
      this.dropdownRef = null;
    } else {
      const factory = this.resolver.resolveComponentFactory(ListComponent);
      this.dropdownRef = this.container.createComponent(factory);
    }
  }

}

