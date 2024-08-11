import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {

  constructor()
  {

   }


   GetDateFromIsoString(_date:Date) :string
   {
    alert("param date:"+_date);
     var d =new Date(_date);
     var ss=  new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();

     return ss;

   }
}
