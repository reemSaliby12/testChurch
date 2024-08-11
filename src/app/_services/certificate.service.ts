import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { baptismCertificate } from '../_models/baptismCertificate';
import { freeCertificate } from '../_models/freeCertificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  // baptism certificate

  add_baptism(item:baptismCertificate) : Observable<number>
  {
     return this.http.post<number>(this.baseUrl+'BaptismCertificates',item);
  }
  update_baptism(id:number, item:baptismCertificate) : Observable<boolean>
  {
     return this.http.put<boolean>(this.baseUrl+'BaptismCertificates/'+id,item);
  }
  delete_baptism(id:number)
  {
     return this.http.delete(this.baseUrl+'BaptismCertificates/'+id);
  }
  getbyNumber_baptism(_num:number,_chid:number):Observable<baptismCertificate>
  {
   let searchParam = { num: _num,chid:_chid };
     return this.http.get<baptismCertificate>(this.baseUrl+'BaptismCertificates/ByNumber',{params:searchParam});
  }
  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }


  // free certificate
  add_free(item:freeCertificate) : Observable<number>
  {
     return this.http.post<number>(this.baseUrl+'FreeCertificates',item);
  }
  update_free(id:number, item:freeCertificate) : Observable<boolean>
  {
     return this.http.put<boolean>(this.baseUrl+'FreeCertificates/'+id,item);
  }
  delete_free(id:number)
  {
     return this.http.delete(this.baseUrl+'FreeCertificates/'+id);
  }
  getbyNumber_free(_num:number,_chid:number):Observable<freeCertificate>
  {
   let searchParam = { num: _num,chid:_chid };
     return this.http.get<freeCertificate>(this.baseUrl+'FreeCertificates/ByNumber',{params:searchParam});
  }


}
