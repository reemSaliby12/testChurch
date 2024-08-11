import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { person } from 'src/app/_models/person';
import { PeopleService } from 'src/app/_services/people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit

{

  @Output () onPersonSlected =new EventEmitter<any>();
  @Input () ParentContainer:any;


  name:string;
  nationalId:string;
  fatherName:string;
  lastName:string;


  personsforView :person[];
  constructor(private peopleService:PeopleService)
  {

  }
  selectperson(id:number)
  {
     // alert(this.ParentContainer);
     // here check if the parent container is people container emit the event else do another stuff....
     if (this.ParentContainer)
     {
      if (this.ParentContainer==="peopleContainer")
      {
        this.onPersonSlected.emit(id);
      }

     }
     else
     {
        // different route....
     }

  }

  ngOnInit(): void
   {

    this.name="";
    this.nationalId="";
    this.lastName="";
    this.fatherName=""


     /*this.peopleService.getAll().subscribe(
      res=>
      {
         this.personsforView=res;
      }
      ,error=>
      {
        console.log("error gettin people list "+error);
      }
     );*/


  }

  performSearch()
  {
   this.peopleService.search(this.name,this.nationalId,this.lastName, this.fatherName,100).subscribe(
    res=>
    {
        this.personsforView=res;
    }
    ,error=>
    {
      alert(error);
    }
   )
  }

}
