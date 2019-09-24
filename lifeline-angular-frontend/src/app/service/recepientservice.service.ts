import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Donor } from '../model/donor';
import { Recepient } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class RecepientserviceService {

  public id;
  private recepientUrl = 'http://52.66.129.41:8080/recepient-service/api/v1/recepient';
  private emailUrl = 'http://52.66.129.41:8080/recepient-service/api/v1/verify';
  private resultUrl = 'http://52.66.129.41:8085/results';
  private chatUrl = 'http://52.66.129.41:8084/email';

  constructor(private httpClient: HttpClient) { }


  saveRecepient(recepient: Recepient): Observable<Recepient> {
    return this.httpClient.post<Recepient>(this.recepientUrl, recepient).pipe(catchError(this.errorHandler));
  }

  getRecepientDetails(id): Observable<Recepient> {
    return this.httpClient.get<Recepient>(this.recepientUrl + '/' + id);
  }


  public updateRecepient(recepient: Recepient, id) {
    this.recepientUrl = this.recepientUrl + '/' + id;
    return this.httpClient.put<Recepient>(this.recepientUrl, recepient);
  }
  public getRecepientById(id: number): Observable<Recepient> {
    return this.httpClient.get<Recepient>(this.recepientUrl + '/' + id);
  }
  deleteRecepient(id): Observable<Recepient> {
    console.log(id)
    console.log(this.recepientUrl + '/' + id);
    return this.httpClient.delete<Recepient>(this.recepientUrl + '/' + id);
  }

  public getRecepientPastHistoryById(id: number): Observable<Recepient> {
    return this.httpClient.get<Recepient>(this.recepientUrl + '/' + id);
  }
  sendMail(id): Observable<any> {
    return this.httpClient.post<any>(this.emailUrl, id);
  }

  getDonorRecommendationsForRecepient(bloodGroup: string): Observable<Recepient> {
    console.log(bloodGroup)
    return this.httpClient.get<Recepient>(this.resultUrl + '/' + bloodGroup);
  }

  getDonorRecommendationsBasedOnOrganAndBloodForRecepient(bloodGroup: string, organ: string): Observable<Array<Donor>> {
    return this.httpClient.get<Array<Donor>>(this.resultUrl + '/' + bloodGroup + '/' + organ);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }

  sendMailForChat(recepientId, donorId, email, donorName) {
    return this.httpClient.get(this.chatUrl + "/" + recepientId + "/" + donorId + "/" + email + "/" + donorName);
  }
}
