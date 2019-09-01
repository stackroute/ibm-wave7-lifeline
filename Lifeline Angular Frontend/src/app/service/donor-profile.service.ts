import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonorProfileService {
  public data:any=[]

  private DonorUrl =  'http://172.23.238.219:8088/api/v1/donor';

  constructor(private httpClient: HttpClient) { }

  saveDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.post<Donor>(this.DonorUrl, donor).pipe(catchError(this.errorHandler));
  }
  getdonerdetails(): Observable<Donor> {
    return this.httpClient.get<Donor>(this.DonorUrl+"/53");
  }
  deleteDonor(id): Observable<any> {

    return this.httpClient.delete<any>(this.DonorUrl+"/3");
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
}
