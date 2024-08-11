import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CertificateService } from 'src/app/_services/certificate.service';
import { baptismCertificate } from 'src/app/_models/baptismCertificate';
import { church } from 'src/app/_models/church';
import { DataService } from 'src/app/_services/data.service';
import { Subject, take, takeUntil } from 'rxjs';
import { PeopleService } from 'src/app/_services/people.service';
import { person } from 'src/app/_models/person';
import { UsersService } from 'src/app/_services/users.service';
import { UserRoles } from 'src/app/_models/UserRoles';
import { ChurchService } from 'src/app/_services/church.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DateHelperService } from 'src/app/_services/date-helper.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PeopleContainerComponent } from '../people-container/people-container.component';
import { FocusMonitorDetectionMode } from '@angular/cdk/a11y';

@Component({
  selector: 'app-baptism',
  templateUrl: './baptism.component.html',
  styleUrls: ['./baptism.component.css']
})
export class BaptismComponent implements OnInit

{
  printData() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(

      `<html>
      <head>
          <title><h1>بيانات الوثيقة الخاصة بك</h1></title>
        </head>
        <body>

        </body>
      </html>`

    );
    printWindow.document.close();
    printWindow.print();
  }















  @ViewChild('dropdownContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  dropdownRef: ComponentRef<ListComponent>;
  _churches?:church[];
  private unsubscribe = new Subject<void>();
  constructor(private resolver:ComponentFactoryResolver,private certificateService :CertificateService,
    private dataService:DataService,private peopleService:PeopleService
    ,private userService:UsersService,
    private churchService:ChurchService,
    private  datehelper:DateHelperService,
    private dialog :MatDialog

    ) {}
  form:FormGroup;
  _certificate :baptismCertificate;
  loadedid:number;
  selectedid:number;
  selectedPerson?:person;
  certifiedisDisabled:boolean;
  DocumentIsLocked:boolean;
  DocumentWillPrint:boolean;
  UserChId:number;
  selectedChid?:number;


  onnew()
{
    this.loadedid=0;
    this.selectedid=0;

   this._certificate={} as baptismCertificate;
   this.selectedPerson={} as person;

   this._certificate.id=0;
   this._certificate.number=0;
   this._certificate.baptismPlace="";
   this._certificate.godFatherName="";
   this._certificate.godMotherName="";
   this._certificate.nameInChurch="";


   this._certificate.baptizingPriestName="";


   this._certificate.baptismDate=new Date();


   this._certificate.issuanceDate=new Date();
   this._certificate.certified=false;
   this._certificate.peID=0;

   this._certificate.per={} as person;
   this._certificate.per.firstName="";
   this._certificate.per.lastName="";
   this._certificate.per.nationalNumber="";
   this._certificate.per.fatherName="";
   this._certificate.per.motherName="";
   this._certificate.per.constraintPlace="";
   this._certificate.per.constraintNumber="";






   this.selectedPerson.firstName="";
   this.selectedPerson.lastName="";
   this.selectedPerson.nationalNumber="";
   this.selectedPerson.fatherName="";
   this.selectedPerson.motherName="";





   this.form.patchValue(this._certificate);
   this. DocumentIsLocked=false;
   this. DocumentWillPrint=false;
}
  ngOnInit()

  {
    // set certified is Disabled ....
    this.certifiedisDisabled=true;
    if (this.userService.CurrentloggedUser.roles)
   {
     if (this.userService.CurrentloggedUser.roles.includes(UserRoles.Bishop)
     ||this.userService.CurrentloggedUser.roles.includes(UserRoles.SystemAdmin))
     {
       this.certifiedisDisabled=false;
       }
    }

    this.UserChId=0;
    if (this.userService.CurrentloggedUser.chID)
    {
      this.UserChId = this.userService.CurrentloggedUser.chID;
    }



    this. form=new FormGroup({

    number: new FormControl(""),
    baptismPlace: new FormControl(""),
    baptismDate: new FormControl(""),
    baptizingPriestName: new FormControl(""),
    issuanceDate: new FormControl(""),
    certified:new FormControl({value:false,disabled:this.certifiedisDisabled}),
    chID: new FormControl("",Validators.required),
    nameInChurch:new FormControl(""),
    godFatherName:new FormControl(""),
    godMotherName:new FormControl(""),
    peID: new FormControl(""),
    per: new FormGroup(
      {
        firstName: new FormControl(""),
        lastName: new FormControl(""),
        nationalNumber: new FormControl(""),
        fatherName: new FormControl(""),
        motherName: new FormControl(""),
        constraintPlace: new FormControl(""),
        constraintNumber: new FormControl(""),


      }
    )
    });


     this.dataService.churchesforuser$.pipe(takeUntil(this.unsubscribe)).subscribe(data=>
      {  console.log("test from baptism churches for user from dataservice:"+data);
        this._churches=data;
      });





    this.onnew();

  }

    ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    }
  onSubmit()
  {
    if (!this.form.valid)
    {
       alert ("Invalid Data");
        return
    }

    console.log("formvalue :"+this.form);

    this._certificate.number  = +this.form.get("number")?.value;
    this._certificate.baptismPlace  = this.form.get("baptismPlace")?.value;
    this._certificate.baptismDate  = this.form.get("baptismDate")?.value;

    this._certificate.baptismDate =
    new Date(this.datehelper.GetDateFromIsoString(this._certificate.baptismDate))
    this._certificate.nameInChurch = this.form.get("nameInChurch")?.value;
    this._certificate.baptizingPriestName  = this.form.get("baptizingPriestName")?.value;
    this._certificate.godFatherName  = this.form.get("godFatherName")?.value;
    this._certificate.godMotherName  = this.form.get("godMotherName")?.value;
    this._certificate.issuanceDate  = this.form.get("issuanceDate")?.value;

    this._certificate.issuanceDate =
    new Date(this.datehelper.GetDateFromIsoString(this._certificate.issuanceDate))
   // this._certificate.issuanceDate  = this.form.get("churcheName")?.value;

    this._certificate.issuanceDate =
    new Date(this.datehelper.GetDateFromIsoString(this._certificate.issuanceDate))
    this._certificate.chID  = +this.form.get("chID")?.value;
   // this._certificate.peID  = +this.form.get("peID")?.value;
    this._certificate.peID=this.selectedid;
    this._certificate.certified  = this.form.get("certified")?.value;



     if (this.loadedid===0)
     {
      // insert
            this.certificateService.add_baptism(this._certificate).subscribe(
        res=>
        {
          alert("inserted"+ res);
          this.onnew();
        },error=>
        {
          if(error instanceof HttpErrorResponse) {
            // Handle error
            alert("Status: "+ error.status +", Message: " + error.error);
         }
        }
      );


     }
     else
     {
      this.certificateService.update_baptism(this.loadedid, this._certificate).subscribe(
        res=>
        {
          alert("updated.."+ res);this.onnew();
        },error=>
        {
          if(error instanceof HttpErrorResponse) {
            // Handle error
            alert("Status: "+ error.status +", Message: " + error.error);
         }
        }
      );
     }
  }

  search(event)
  {

   // console.log(this.selectedChid);

     if (!this.selectedChid)
     {
      alert("No Church Was Selected")
        return;
     }
    let userval= event.target.value;
   // alert(userval);
   this.certificateService.getbyNumber_baptism(userval,this.selectedChid).subscribe(
    res=>
    {
      let cert=res;
      if (cert)
      {
        if (this._churches.some(x=>x.id=== cert.chID))
       {
        this._certificate=res;
        this.loadedid=this._certificate.id;
        this.selectedid =this._certificate.peID;

      this.form.patchValue(this._certificate);
       this.DocumentIsLocked = this._certificate.certified;
alert("id :"+this.loadedid);
       }
       else
       {
          alert("invalid user request to load document");
       }
      }
    },error=>
    {
        alert(error);
    }
   )
  }


  onNationalIdBlur(event:any)
  {
    this.peopleService.getbynationalNumber(event.target.value).subscribe(
      res=>
      {
      this.selectedPerson=res;
      this.selectedid=this.selectedPerson.id;
      this._certificate.peID=this.selectedid;
          this.form.patchValue({per:this.selectedPerson});
      },error=>
      {
        this.selectedid=0;
        this._certificate.peID=this.selectedid;
        this.selectedPerson={} as person;
        this.selectedPerson.firstName="";
        this.selectedPerson.lastName="";
        this.selectedPerson.nationalNumber="";
        this.selectedPerson.fatherName="";
        this.selectedPerson.motherName="";
        this.selectedPerson.constraintPlace="";
        this.selectedPerson.constraintNumber="";
        this.form.patchValue({per:this.selectedPerson});

        alert("National Id Not Found");
        console.log("error getting national Id "+error)
      }
    );
  }

  selectPerson()
  {
    const dialogConfig =new MatDialogConfig();
    dialogConfig.autoFocus=true;
    // passing data to the dialog ....
    dialogConfig.data=
    {
      id:0
    }
    const dialogRef = this.dialog.open(PeopleContainerComponent,dialogConfig);
   dialogRef.afterClosed().subscribe(
    data=>
    {
      if (data)
      {
        alert("from dialog - the   selected Id Is :"+data);
        this.peopleService.getperson(data).subscribe(
          res=>
          {
          this.selectedPerson=res;
          this.selectedid=this.selectedPerson.id;
          this._certificate.peID=this.selectedid;
              this.form.patchValue({per:this.selectedPerson});
          },error=>
          {
            this.selectedid=0;
            this._certificate.peID=this.selectedid;
            this.selectedPerson={} as person;
            this.selectedPerson.firstName="";
            this.selectedPerson.lastName="";
            this.selectedPerson.nationalNumber="";
            this.selectedPerson.fatherName="";
            this.selectedPerson.motherName="";
            this.selectedPerson.constraintPlace="";
            this.selectedPerson.constraintNumber="";
            this.form.patchValue({per:this.selectedPerson});

            alert("Person Id Not Found");
            console.log("error getting Person Id "+error)
          }
        );
      }
      else
      {
        alert("nothing was selected");
      }

    }
   )

  }
}

