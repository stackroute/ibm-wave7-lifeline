import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { VerificationAlertComponent } from '../recepientregistrationformcomponent/verification-alert/verification-alert.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  private emailid;

  constructor(private dialog:MatDialog,private authenticateService: AuthenticateService, private formBuilder: FormBuilder,private router:Router) { }
  
  ngOnInit() {
  }
  
  reset() {
    console.log(this.emailid);
    this.authenticateService.forgotpassword(this.emailid)
    .subscribe(data => {
      console.log(data);
    });
    const dialogRef = this.dialog.open(VerificationAlertComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    window.location.href="";
    
  }
// forgotpassword(){
//   this.router.navigate(['/forgotPassword']);
// }
}
