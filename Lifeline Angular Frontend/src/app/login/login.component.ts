import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateService } from '../service/authenticate.service';
import { User } from '../model/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public result;
  private user = new User();
  loginForm: FormGroup;

  constructor(private authenticateService: AuthenticateService, private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
        // this.authenticateService.login(this.user)
    // .subscribe(data=>this.result=data);
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      userType: ['']
    });
  }

  loginUser() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    this.user.role = this.loginForm.get('userType').value;
    this.authenticateService.login(this.user)
      .subscribe(data => {
        console.log(data);
        if(this.user.role == 'donor') {
          this.router.navigate(['/donor']);
        }
        else {
          this.router.navigate(['/recepient'])
        }
      },
      error => {
        console.log(error);
      });
  }
}
