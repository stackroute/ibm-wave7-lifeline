import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonorProfileService {
  public data: any = [];

  private donorUrl = 'http://localhost:8081/api/v1/donor';

  constructor(private httpClient: HttpClient) { }


  public getDonorById(id: number): Observable<Donor> {
    return this.httpClient.get<Donor>(this.donorUrl + '/' + id);
  }

  saveDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.post<Donor>(this.donorUrl, donor).pipe(catchError(this.errorHandler));
  }
  getDonorDetails(id): Observable<Donor> {
    return this.httpClient.get<Donor>(this.donorUrl + '/' + id);
  }
  deleteDonor(id): Observable<any> {

    return this.httpClient.delete<any>(this.donorUrl + '/' + id);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }

  public updateDonor(donor: Donor, id) {
    let updateUrl = 'http://localhost:8081/api/v1/donor';
    updateUrl = updateUrl + '/' + id;
    return this.httpClient.put<Donor>(updateUrl, donor);
  }
}
