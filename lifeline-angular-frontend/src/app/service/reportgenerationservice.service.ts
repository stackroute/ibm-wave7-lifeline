import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportgenerationserviceService {

  private reportUrl = 'http://52.66.129.41:8080/report-service/api/v1/';
  constructor(private http: HttpClient) { }

  donorreports() {
    return this.http.get(this.reportUrl + 'donor/registrations');
  }
  recepientreports() {
    return this.http.get(this.reportUrl + 'recepient/registrations');
  }
  organdonationreports() {
    return this.http.get(this.reportUrl + 'organs/donations');
  }
}