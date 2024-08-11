import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { church } from './_models/church';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService 
{
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }


  
}
