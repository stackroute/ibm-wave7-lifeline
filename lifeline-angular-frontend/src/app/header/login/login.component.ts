import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  logged: boolean;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private authenticateService: AuthenticateService, private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.logged = false;
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }
  close() {
    this.dialogRef.close();
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
        if (data.token != "Please Verify Your Email") {
          this.logged = false;
          if (data.role === 'donor') {
            this.router.navigate(['/donor'], { queryParams: { id: id } });
            this.authenticateService.setLoggedValue(true);
            this.dialogRef.close();
          }
          else if (data.role === 'recepient') {
            this.router.navigate(['/recepient'], { queryParams: { id: id } });
            this.authenticateService.setLoggedValue(true);
            this.dialogRef.close();
          }
        }
        else if (data != null) {
          this.logged = false;
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
          this.logged = true;
          console.log(error);
        });
  }

  signup() {
    console.log(this.data)
    if (this.data === 'donor') {
      this.router.navigate(['/donor-registration']);
      console.log(this.data)
      this.dialogRef.close();
    }
    else {
      this.router.navigate(['/recepient-registration']);
      this.dialogRef.close();
    }
  }

  forgotPassword() {
    this.router.navigate(['/forgotPassword']);
    this.dialogRef.close();
  }
}
