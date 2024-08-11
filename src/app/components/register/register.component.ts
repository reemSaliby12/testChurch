import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserRoles } from 'src/app/_models/UserRoles';
import { church } from 'src/app/_models/church';
import { userForEdit } from 'src/app/_models/userForEdit';
import { DataService } from 'src/app/_services/data.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent   implements OnInit
{


  churches: church[];
  rolesenum = UserRoles;
  Allroles : string[];
  userId?:string;
  form :FormGroup;
  user:userForEdit;
  iseditmode:boolean;
  title!:string;


  private unsubscribe = new Subject<void>();

   constructor(private dataService:DataService,private router:Router,
    private activatedRoute:ActivatedRoute,private userService:UsersService
    )
   {

   }
  ngOnInit(): void
   {
    this.Allroles =  Object.keys(this.rolesenum);
    this.dataService.churches$.pipe(takeUntil(this.unsubscribe)).subscribe(data=>
      {
        this.churches=data;
      });

      this.form =new FormGroup
     (
      {
        userName:new FormControl(''),
        email:new FormControl(''),
         password:new FormControl(''),
         role:new FormControl(''),
         chID:new FormControl('')
      }
     );

     // load user....
      this.loaduser();
  }

  onSubmit()
  {



     this.user.email  = this.form.get("email")?.value;
     this.user.password = this.form.get("password")?.value;
     this.user.chID= +this.form.get("chID")?.value;
     this.user.userName = this.form.get("userName")?.value;
     this.user.role = this.form.get("role")?.value;

     if (this.userId)
     {
        // update...
        this.user.password="";
         this.userService.updateuser(this.userId,this.user).subscribe
         (
          result=>
          {
            alert("User " + this.user.userName + " has been updated.");
            this.router.navigate(['/header/users']);
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
        this.userService.adduser(this.user).subscribe
         (
          result=>
          {
            alert("User " + this.user.userName + " has been Added.");
            this.router.navigate(['/header/users']);
          }
          ,
          error=>
          {
            alert(error);

          }

         )
     }

  }


  loaduser()
  {
    this.userId = this.activatedRoute.snapshot.params['id'];

    if (this.userId)
    {
        this.iseditmode=true;
        // edit...

         this.userService.getUser(this.userId).subscribe
         (
          result=>
          {
            this.user = result;
            this.title="Editing.."+this.user.userName;

            // update the form from the result....
            this.form.patchValue(this.user);
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

      this.user={} as userForEdit;

      this.form.patchValue(this.user);

    }
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    }

}
