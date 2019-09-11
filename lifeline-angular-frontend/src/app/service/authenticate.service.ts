import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../model/User";
import { Observable, BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private apiUrl = "http://localhost:8082/register";

  private apiUrl2 = "http://localhost:8082/authenticate";

  loggedIn = new BehaviorSubject<boolean>(false);
  logged = this.loggedIn.asObservable();

  private user: User;

  constructor(private httpClient: HttpClient) { }

  // public user:User;
  saveUser(user: User): Observable<User> {
    // user = Guid.create().toString();
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  login(data: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl2, data);
  }

  private apiUrl3 = "http://localhost:8082/forgot-password"
  forgotpassword(data: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl3, data);
  }

  private apiUrl4 = "http://localhost:8082/reset-password";
  resetpassword(data: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl4, data);
  }
}
