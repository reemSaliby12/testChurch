import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticatedResponse } from '../_models/AuthenticatedResponse';
import { UsersService } from '../_services/users.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit

{
   @Input()appHasRole:string[];
   authRes:AuthenticatedResponse;


   constructor( private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private userservice: UsersService)
     {
      this.userservice.loggedUser$.pipe(take(1)).subscribe(
        res=>
        {
          this.authRes=res;
        }
      )
      }
  ngOnInit(): void
   {
   
    if (!this.authRes?.roles || this.authRes == null )
    {
      this.viewContainerRef.clear();
      return;
    }
    if (this.authRes?.roles.some(r=>this.appHasRole.includes(r)))
    {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
    else
    {
      this.viewContainerRef.clear();
    }
  }

}
