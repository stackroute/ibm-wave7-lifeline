import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateService } from '../../service/authenticate.service';
import { User } from '../../model/User';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { VerificationAlertComponent } from 'src/app/recepientregistrationformcomponent/verification-alert/verification-alert.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public result;
  
  private user = new User();
  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private authenticateService: AuthenticateService, private formBuilder: FormBuilder, private router: Router,private dialog:MatDialog) { }

  ngOnInit() {
    // this.authenticateService.login(this.user)
    // .subscribe(data=>this.result=data);
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  loginUser() {

    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    this.user.role = this.data;
    console.log(this.data);
    this.authenticateService.login(this.user)
      .subscribe(data => {
        let id = data.id;
        console.log(data);
        if(data.token != "Please Verify Your Email") {
          if (data.role === 'donor') {
            this.authenticateService.loggedIn.next(true);
            this.router.navigate(['/donor'], { queryParams: { id: id } });
            this.dialogRef.close();
          }   
          else if (data.role === 'recepient') {
            this.authenticateService.loggedIn.next(true);
            this.router.navigate(['/recepient'], { queryParams: { id: id } });
            this.dialogRef.close();
          }
        }
        else {
          const dialogRef = this.dialog.open(VerificationAlertComponent, {
            width: '250px',
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
          //this.router.navigate(['']);
          this.dialogRef.close();
        }
      },
        error => {
          console.log(error);
        });
  }
}
