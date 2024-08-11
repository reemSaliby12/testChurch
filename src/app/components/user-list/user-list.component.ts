import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { userForView } from 'src/app/_models/userForView';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit
 {

  usersforView:userForView[];

  constructor( private userService:UsersService,private http: HttpClient)

  {

  }

  delete(id:string) {
alert(id);

    this.http.delete("http://homsgreek01.somee.com/api/Auth/"+id).subscribe(
      (response) => {
        this.  usersforView = this. usersforView.filter(user => user.id !== id);
        console.log('User deleted successfully:', response);
        // يمكنك هنا تحديث قائمة المستخدمين بعد حذف المستخدم
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }



  ngOnInit(): void
  {
     this.userService.getUsers().subscribe(
      res=>
      {
          this.usersforView=res;
      }
      ,error=>
      {
        console.log("error get users "+error);
      }
     )
  }
  EditUser(id:string)
  {
    alert(id);
  }
  deleteUser(id:string){
    alert(id);
  }

}
