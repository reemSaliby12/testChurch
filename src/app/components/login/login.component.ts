import { Component ,OnInit,ViewChild} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/_services/users.service';
import { loginModel } from 'src/app/_models/loginmodel';
import { HttpErrorResponse } from '@angular/common/http';

;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  [x: string]: any;

  constructor(private ser:ServicesService,
     private  userService:UsersService,
    private router:Router){}


form:FormGroup;
loginmodel:loginModel;

ngOnInit()
 {

  document.querySelectorAll('form input').forEach((input: HTMLInputElement) => {
    input.addEventListener('input', () => {
      console.log(`Current value of ${input.id}:`, input.value); // Debugging line
      if (input.value.trim() !== "") {
        input.classList.add('filled');
      } else {
        input.classList.remove('filled');
      }
    });
  });

  this.loginmodel={} as loginModel;
 this.loginmodel.userName="";
 this.loginmodel.password="";

  this.form=new FormGroup
  ({
    userName:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });

  this.form.patchValue(this.loginmodel);

}

Performlogin()
{


  if (this.form.invalid){
    alert("invalid form data");
    return;}
    this.loginmodel.userName= this.form.get("userName")?.value;
    this.loginmodel.password= this.form.get("password")?.value;
    this.userService.performlogin(this.loginmodel).subscribe(
    res=>
    {

     // this.router.navigate([{ outlets: { mainrouter: [ 'header' ] }}]);
      this.router.navigate(['header/home']);
    },error=>
    {
      if(error instanceof HttpErrorResponse) {
        // Handle error
        alert("Status: "+ error.status +", Message: " + error.error);
     }
    }
   )


}


 handleSubmit = (e:any) => {
  e.preventDefault();

}
}
