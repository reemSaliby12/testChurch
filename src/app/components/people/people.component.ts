import { Component, ComponentFactoryResolver, EventEmitter, Input, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { person } from 'src/app/_models/person';
import { PeopleService } from 'src/app/_services/people.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DateHelperService } from 'src/app/_services/date-helper.service';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent

{
  personsforView: person[] ;


  constructor(private resolver:ComponentFactoryResolver,
    private peopleservice :PeopleService,
    private datehelper:DateHelperService,private http: HttpClient) {}
  form: FormGroup;
  _person : person;
  loadedid:number;
  name="";
 nationalId="";
 lastName="";
 fatherName=""

  @Output() onPersonAdded =new EventEmitter<any>();
  @Input () ParentContainer:any;




onnew()
{
    this.loadedid=0;

}

  ngOnInit(){
 this.loadperson();
  { this.peopleservice . getAll().subscribe(
    res=>
    {
        this.personsforView=res;
    }
    ,error=>
    {
      console.log("error get people "+error);
    }
   )}



   this.name="";
   this.nationalId="";
   this.lastName="";
   this.fatherName=""





  this.onnew();

}

loadperson() {
  // افتراضياً: قم بتحميل الكنائس وتعيينها إلى churchsforView
  this.http.get<any[]>(this.apiUrl).subscribe(
    data => {
      this.personsforView = data;
    },
    error => {
      console.error('Error loading person:', error);
    }
  );
}


perSearch(name:string)
{  console.log('Searching for:', name);
 this.peopleservice.personsearch(name).subscribe(
  res=>
  {  console.log('Response received:', res);
    this.personsforView = res
  }
  ,error=>
  {  console.error('Error:', error);
    alert(error);
  }
 )
}





private apiUrl = 'http://homsgreek01.somee.com/api/person';

delete(id:number) {

  this.http.delete(`${this.apiUrl}/${id}`).subscribe(
    (response) => {
      console.log('person is  deleted successfully:', response);
      this.  personsforView = this. personsforView.filter(person => person.id !== id);
      // يمكنك هنا تحديث قائمة المستخدمين بعد حذف المستخدم
    },
    (error) => {
      console.error('Error deleting user:', error);
    }
  );
}}




/*presearch(event)
  {


    let v= event.target.value;
    //alert(userval);
   this.peopleservice.searchPerson(v).subscribe(
    res=>
    {
      this.personsforView=res;
      this.loadedid=this._person.id;
      handle the date
      birthdateiso: this._person.birthDate.toISOString().slice(0, 10);

  this._person.birthDate= new Date(this._person.birthDate?.toISOString().slice(0, 10));
      this._person.birthDate =new Date(this.GetDateFromIsoString(this._person.birthDate));
  alert(this._person.birthDate);




  this.form.patchValue(this._person);
    if (this._person.gender)
    {
      // check the male
      var rdmale= document.getElementById('Rdbtnmale')as HTMLInputElement;
      rdmale.checked=true;
    }
    else
    {
      // check the female
      var rdfemale= document.getElementById('Rdbtnfemale')as HTMLInputElement;
      rdfemale.checked=true;
    }

    },error=>
    {
        alert(error);
    }
 ) }*/


