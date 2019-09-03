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

  private donorUrl =  'http://localhost:8082/api/v1/donor';

  constructor(private httpClient:HttpClient) { }


  public getDonorById(id: number):Observable<Donor>
  {
    return this.httpClient.get<Donor>(this.donorUrl + "/" + id);
  }

  saveDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.post<Donor>(this.donorUrl, donor).pipe(catchError(this.errorHandler));
  }
  getdonerdetails(): Observable<Donor> {
    return this.httpClient.get<Donor>(this.donorUrl+"/2");
  }
  deleteDonor(id): Observable<any> {

    return this.httpClient.delete<any>(this.donorUrl+"/1");
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }

  public updateDonor(donor: Donor) {
    let updateUrl = 'http://localhost:8081/api/v1/donor';

    console.log(donor);
    let id=donor.id
    updateUrl = updateUrl+ '/'+id;
    return this.httpClient.put<Donor>(updateUrl,donor);
  }
}
