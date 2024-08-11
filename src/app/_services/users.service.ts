import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userForView } from '../_models/userForView';
import { userForEdit } from '../_models/userForEdit';
import { loginModel } from '../_models/loginmodel';
import { AuthenticatedResponse } from '../_models/AuthenticatedResponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChurchService } from './church.service';
import { DataService } from './data.service';
import { userForDelet } from '../_models/userForDelet';


@Injectable({
  providedIn: 'root'
})
export class UsersService
 {
  deleteUser(username:string,user:userForDelet) {
    throw new Error('Method not implemented.');


  }

  decodedToken: any;
  jwtHelper =new JwtHelperService();

  private loggedUser = new ReplaySubject<AuthenticatedResponse>(1) ;
  loggedUser$ = this.loggedUser.asObservable();

  private LoggedUserName =new ReplaySubject<string>(1);
  LoggedUserName$ = this.LoggedUserName.asObservable();

  CurrentloggedUser : AuthenticatedResponse;


  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient,private churchservice:ChurchService,private dataService:DataService)
  {

   }

   getUsers():Observable<userForView[]>
  {
     return this.http.get<userForView[]>(this.baseUrl+'Auth');
  }
  getUser(username:string):Observable<userForEdit>
  {

    return this.http.get<userForEdit>(this.baseUrl+'Auth/'+username);
  }

  adduser(user:userForEdit) : Observable<boolean>
  {
    return  this.http.post<boolean>(this.baseUrl+'Auth/register',user);
  }

  updateuser(username:string,user:userForEdit) :Observable<boolean>
  {

    return  this.http.put<boolean>(this.baseUrl+'Auth/'+username,user);
  }





  performlogin(loginmodel:loginModel)
  {
    return  this.http.post
    (this.baseUrl+'Auth/login',loginmodel).pipe
    (
      map
      (
        (res :AuthenticatedResponse)=>
        {
          const user = res;

          if (user)
          {
            sessionStorage.setItem('user',JSON.stringify(user));
            this.loggedUser.next(user);
            this.LoggedUserName.next(user.userName);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.CurrentloggedUser = user;
            this.churchservice.getChurchesforUser(user.id).subscribe(
              r=>
              {
               // console.log("test result from getChurchesforUser in user perform login"+r);
                this.dataService.fillChurchesforuser(r);

              },err=>
              {
                console.log("Get Churches for user Error: "+err);
              }
            )
          }
          else
          {
            console.log("Invalid Login Info....")
          }
        }
      )
    );
  }


  setCurrentUser(user:AuthenticatedResponse)
  {
    this.loggedUser.next(user);
    this.LoggedUserName.next(user.userName);
    this.decodedToken = this.jwtHelper.decodeToken(user.token);
    this.CurrentloggedUser = user;
    this.churchservice.getChurchesforUser(user.id).subscribe(
      r=>
      {
       // console.log("test result from getChurchesforUser in user perform login"+r);
        this.dataService.fillChurchesforuser(r);

      },err=>
      {
        console.log(err);
      }
    )
  }

  performlogout()
  {
    sessionStorage.removeItem('user');
    this.loggedUser.next(null);
    this.LoggedUserName.next("");
    this.CurrentloggedUser = null;

  }



}
