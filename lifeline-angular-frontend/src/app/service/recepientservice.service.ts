import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recepient, Donor } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class RecepientserviceService {

  public id;
  private RecepientUrl = 'http://52.66.129.41:8083/api/v1/recepient';
  constructor(private httpClient: HttpClient) { }


  saveRecepient(recepient: Recepient): Observable<Recepient> {
    return this.httpClient.post<Recepient>(this.RecepientUrl, recepient).pipe(catchError(this.errorHandler));
  }
  
  getRecepientDetails(id): Observable<Recepient>{
    return this.httpClient.get<Recepient>(this.RecepientUrl+"/" + id);
  }
  

  public updateRecepient(recepient:Recepient , id) {
    let updateUrl = 'http://52.66.129.41:8083/api/v1/recepient';
    updateUrl = updateUrl+ '/'+id;
    return this.httpClient.put<Recepient>(updateUrl, recepient);
  }
   public getRecepientById(id: number):Observable<Recepient>{
     return this.httpClient.get<Recepient>(this.RecepientUrl + "/" + id);
   }

   public getRecepientPastHistoryById(id: number):Observable<Recepient>{
    console.log()
    return this.httpClient.get<Recepient>(this.RecepientUrl+ "/" + id);
  }
  private emailUrl = "http://52.66.129.41:8083/api/v1/verify"
  sendMail(id): Observable<any> {
    return this.httpClient.post<any>(this.emailUrl, id);
  }

  getDonorRecommendationsForRecepient(bloodGroup: string):Observable<Recepient>{
<<<<<<< HEAD
    let resultUrl = 'http://172.23.238.228:8084/results'
=======
    let resultUrl = 'http://52.66.129.41:8084/results'
>>>>>>> 4c56f58274d8c9b0567be0e4f58081e63cc4f322
    return this.httpClient.get<Recepient>(resultUrl+ "/" + bloodGroup);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
}
