import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-people-container',
  templateUrl: './people-container.component.html',
  styleUrls: ['./people-container.component.css']
})
export class PeopleContainerComponent implements OnInit

{
  receivedId?:number;
  containerName:string;
  constructor(

    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef:MatDialogRef<PeopleContainerComponent>,
    )
    {
      this.containerName="peopleContainer";
    this.receivedId =data.id;
    }
  ngOnInit(): void
   {
    
  }
  selectPersonIdFromList(id:any)
  {
   // alert("selected Id="+id);
    this.dialogRef.close(id);
  }
  selectPersonIdAfterAdd(id:any)
  {
    this.dialogRef.close(id);
  }

  

}
