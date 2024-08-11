import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { church } from '../_models/church';

@Injectable({
  providedIn: 'root'
})
export class ChurchService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }




  addchurch(item:church) : Observable<number>
   {
      return this.http.post<number>(this.baseUrl+'Churches',item);
   }
   updateChurch(id:number,item:church) :Observable<boolean>
   {

     return  this.http.put<boolean>(this.baseUrl+'Churches/'+id,item);
   }
   deleteChurch(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)

    ;
  }
  getchurch(id:number):Observable<church>{
    return this.http.get<church>(this.baseUrl+'Churches/'+id)
  }






  handleError(handleError: any): import("rxjs").OperatorFunction<Object, any> {
    throw new Error('Method not implemented.');
  }

   getChurches():Observable<church[]>
  {
     return this.http.get<church[]>(this.baseUrl+'Churches');
  }
  getChurchesforUser(userIdval:string):Observable<church[]>
  {
    let searchParam = { userId: userIdval }
     return this.http.get<church[]>(this.baseUrl+'Churches/foruser',{params:searchParam});
  }
  search(name: string):Observable<church[]>
  {

  // let searchParam = { name: name }
   return this.http.get<church[]>(this.baseUrl+'churches/getname/'+name);


  }


}
