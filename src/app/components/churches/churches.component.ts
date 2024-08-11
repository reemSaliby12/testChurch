import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { church } from 'src/app/_models/church';
import { ChurchService } from 'src/app/_services/church.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';



@Component({
  selector: 'app-churches',
  templateUrl: './churches.component.html',
  styleUrls: ['./churches.component.css']
})
export class ChurchesComponent {
  @ViewChild('dropdownContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  dropdownRef: ComponentRef<ListComponent>;

ngOnOnit(){
  this.loadChurches();
}


 churches:church[];

  constructor(private ChurchService:ChurchService,private http: HttpClient) {}

  nameChurch:string
  churchsforView :church[];
  private apiUrl = 'http://homsgreek01.somee.com/api/Churches';

  delete(id:number) {

    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.  churchsforView = this. churchsforView.filter(user => user.id !== id);
        // يمكنك هنا تحديث قائمة المستخدمين بعد حذف المستخدم
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // أخطاء من جانب العميل
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // أخطاء من جانب الخادم
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  loadChurches() {
    // افتراضياً: قم بتحميل الكنائس وتعيينها إلى churchsforView
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => {
        this.churchsforView = data;
      },
      error => {
        console.error('Error loading churches:', error);
      }
    );
  }
  ngOnInit(): void
  {this.loadChurches();
     this.ChurchService. getChurches().subscribe(
      res=>
      {
          this.churchsforView=res;
      }
      ,error=>
      {
        console.log("error get users "+error);
      }
     )

  }










perSearch(event)
{ let v=event.target.value;
 this.ChurchService.search(v).subscribe(
  res=>
  {

      this.churchsforView=res;
  }
  ,error=>
  {
    alert(error);
  }
 )
}

}







