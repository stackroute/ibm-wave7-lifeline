import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecepientserviceService {

  public id;
  private RecepientUrl = 'http://localhost:8083/api/v1/recepient';
  constructor(private httpClient: HttpClient) { }

  saveRecepient(recepient: Recepient): Observable<Recepient> {
    return this.httpClient.post<Recepient>(this.RecepientUrl, recepient).pipe(catchError(this.errorHandler));
  }
  
  getrecepientdetails(): Observable<Recepient> {
    return this.httpClient.get<Recepient>(this.RecepientUrl+"/1");
  }

  public updateRecepient(recepients):any{
    let updateUrl='http://localhost:8083/api/v1/recepient';
 
     console.log(recepients);
     this.id=recepients.id;
     updateUrl=updateUrl+ '/'+ this.id;
     return this.httpClient.put(updateUrl,recepients);
   }
   public getRecepientById(id: number):Observable<Recepient>{
     return this.httpClient.get<Recepient>(this.RecepientUrl + "/" + id);
   }

   public getRecepientPastHistoryById(id: number):Observable<Recepient>{
    console.log()
    return this.httpClient.get<Recepient>(this.RecepientUrl+ "/" + id);
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
}
