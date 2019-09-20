import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Observable, BehaviorSubject } from 'rxjs';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private authenticationUrl = 'http://52.66.129.41:8082/';
  private apiUrl = this.authenticationUrl + 'register';
  private apiUrl2 = this.authenticationUrl + 'authenticate';
  private apiUrl3 = this.authenticationUrl + 'forgot-password';
  private apiUrl4 = this.authenticationUrl + 'reset-password';

  loggedIn = new BehaviorSubject<boolean>(false);
  logged = this.loggedIn.asObservable();

  private user: User;

  constructor(private httpClient: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { 
  }

  setLoggedValue(value: boolean) {
    console.log(value);
    this.loggedIn.next(value);
    this.storage.set("logged", value)
  }

  getLoggedValue() {
    return this.storage.get("logged");
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  login(data: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl2, data);
  }

  forgotpassword(data: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl3, data);
  }

  resetpassword(data: User): Observable<any> {
    console.log("data service"+data)
    return this.httpClient.put<any>(this.apiUrl4, data);
  }
}
