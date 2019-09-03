import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from "@angular/common/http";
// import { User } from "./modals/User";
// import { LoginUser } from "./modals/Login";
import {User} from "../model/User";
import {LoginUser} from "../model/Login";
import { Observable } from 'rxjs';

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
  private user: User;
  constructor(private httpClient:HttpClient) { }
 // public user:User;
  saveUser(user:User):Observable<User>
  {
  
    // user = Guid.create().toString();
    return this.httpClient.post<User>(this.apiUrl, user);
  }


public loginuser:LoginUser;
// login(user:LoginUser): Observable<LoginUser>{
//     var apiUrl = "http://localhost:8080/login";
//     // this.authenticateUser(user);
//     return this.httpClient.post<LoginUser>(apiUrl, this.loginuser, httpOptions);

//   }

  login(data: User): Observable<any>{
    console.log(data);
    return this.httpClient.post<any>(this.apiUrl2, data);
  }
  private apiUrl3 = "http://172.23.238.202:8080/forgot-password"
  forgotpassword(data: User): Observable<any>{
    return this.httpClient.post<any>(this.apiUrl3,data);
}
private apiUrl4 = "http://localhost:8080/reset-password";
  resetpassword(data: User): Observable<any>{
    return this.httpClient.post<any>(this.apiUrl4,data);
}
}
