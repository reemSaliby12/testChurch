import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { church } from 'src/app/_models/church';
import { ChurchService } from 'src/app/_services/church.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';



@Component({
  selector: 'app-add-curch',
  templateUrl: './add-curch.component.html',
  styleUrls: ['./add-curch.component.css']
})
export class AddCurchComponent {

  form:FormGroup;
 // _church:church;
  church:church;
  churchId?:number;
  title!:string;
  iseditmode:boolean;
  private unsubscribe = new Subject<void>();

  constructor(private ChurchService:ChurchService,private router:Router,private activatedRoute:ActivatedRoute) {}
  ngOnInit()
  {
    this.form=new FormGroup({
      name:new FormControl(''),
      adress:new FormControl(''),
      telephon:new FormControl(''),
      mobile:new FormControl(''),
      email:new FormControl('')
});
this.loadchurch();

}



onSubmit()
{
  this.church.name  = this.form.get("name")?.value;
  this.church.adress  = this.form.get("adress")?.value;
  this.church.telephon = this.form.get("telephon")?.value;
  this.church.mobile = this.form.get("mobile")?.value;
  this.church.email  = this.form.get("email")?.value;




if (this.churchId)
  {
     // update...
    
      this.ChurchService. updateChurch(this.churchId,this.church).subscribe
      (
       result=>
       {
         alert("church " + this.church.name+ " has been updated.");
         this.router.navigate(["['/header/churches',item.id]"]);
       }
       ,
       error=>
       {
         console.log(error);
        alert(error);
       }

      )
  }
  else
  {
     // add...
     this.ChurchService. addchurch(this.church).subscribe
      (
       result=>
       {
         alert("User " + this.church.name + " has been Added.");
         this.router.navigate(['/header/churchRegister']);
       }
       ,
       error=>
       {
         alert(error);

       }

      )
  }

}


loadchurch()
{
  this.churchId = this.activatedRoute.snapshot.params['id'];

  if (this.churchId)
  {
      this.iseditmode=true;
      // edit...

       this.ChurchService.getchurch(this.churchId).subscribe
       (
        result=>
        {
          this.church= result;
          this.title="Editing.."+this.church.name;

          // update the form from the result....
          this.form.patchValue(this.church);
        }
        ,
        error=>
        {console.log(error);}
        )
  }
  else
  {
      this.iseditmode=false;
      // add...
      this.title="إضافة مستخدم جديد";
     // this.form.patchValue(this.user);
    //  this.user=Object.assign(<User>{}, this.form.value);

    this.church={} as church;

    this.form.patchValue(this.church);

  }
}


ngOnDestroy() {
  this.unsubscribe.next();
  this.unsubscribe.complete();
  }

}










