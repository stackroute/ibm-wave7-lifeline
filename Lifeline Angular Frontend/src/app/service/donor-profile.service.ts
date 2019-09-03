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

  public donorUrl = 'http://localhost:8081/api/v1/donor';
public id;

  constructor(private httpClient:HttpClient) { }


  public getDonorById(id: number):Observable<Donor>
  {
    return this.httpClient.get<Donor>(this.donorUrl + "/" + id);
  }

  saveDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.post<Donor>(this.donorUrl, donor).pipe(catchError(this.errorHandler));
  }
  getdonordetails(): Observable<Donor> {
    return this.httpClient.get<Donor>(this.donorUrl+"/1");
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
    this.id=donor.id
    updateUrl = updateUrl+ '/'+this.id;
    return this.httpClient.put<Donor>(updateUrl,donor);
  }
}
