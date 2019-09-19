import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { Donor } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class DonorProfileService {
  public data: any = [];

  private donorUrl = 'http://52.66.129.41:8080/donor-profile-service/api/v1/donor';
  private emailUrl = 'http://52.66.129.41:8080/donor-profile-service/api/v1/verify';
  private formUrl = 'http://52.66.129.41:8080/donor-profile-service/api/v1/forms';
  constructor(private httpClient: HttpClient) { }


  public getDonorById(id: number): Observable<Donor> {
    console.log(id);
    return this.httpClient.get<Donor>(this.donorUrl + '/' + id);
  }

  saveDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.post<Donor>(this.donorUrl, donor).pipe(catchError(this.errorHandler));
  }
  getDonorDetails(id): Observable<Donor> {
    return this.httpClient.get<Donor>(this.donorUrl + '/' + id);
  }

  deleteDonor(id): Observable<Donor> {
   console.log(id)
   console.log(this.donorUrl + '/' + id);
   return this.httpClient.delete<Donor>(this.donorUrl + '/' + id);
 }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }

  public updateDonor(donor: Donor, id) {
    this.donorUrl = this.donorUrl + '/' + id;
    return this.httpClient.put<Donor>(this.donorUrl, donor);
  }
  sendMail(id): Observable<any> {
    return this.httpClient.post<any>(this.emailUrl, id);
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.formUrl, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.httpClient.request(req);
  }
}
