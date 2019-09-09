import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportgenerationserviceService {

  constructor(private http:HttpClient) { }

  donorreports()
  {
    return this.http.get("http://localhost:8080/api/v1/donor/registrations");
   //  .pipe(map(result => result));
  }
  recepientreports()
  {
    return this.http.get("http://localhost:8080/api/v1/recepient/registrations");
   //  .pipe(map(result => result));
  } 
  organdonationreports()
  {
    return this.http.get("http://localhost:8080/api/v1/organs/donations");
   
   //  .pipe(map(result => result));
  } 
}
