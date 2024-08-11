import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { church } from '../_models/church';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{


  private churches = new BehaviorSubject<church[]>([]);
  public  churches$ = this.churches.asObservable();

  private churchesforuser = new BehaviorSubject<church[]>([]);
  public  churchesforuser$ = this.churchesforuser.asObservable();

  constructor() { }

  fillChurches(data:church[])
  {
    this.churches.next(data);
  }
  fillChurchesforuser(data:church[])
  {
    this.churchesforuser.next(data);
  }


}
