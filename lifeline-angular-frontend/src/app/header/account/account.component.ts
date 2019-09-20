import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DonorProfileService } from '../../service/donor-profile.service';
import { DeletealertComponent } from '../deletealert/deletealert.component';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  donorId: Number;
  loggedIn: boolean;

  constructor(private donorProfileService: DonorProfileService,
    private router: Router, private route: ActivatedRoute,
    private authenticateService: AuthenticateService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.authenticateService.loggedIn.subscribe(data => {
      this.loggedIn = data;
      console.log(this.loggedIn);
    })
    this.loggedIn = this.authenticateService.getLoggedValue()
  }

  openDialog(userType): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: userType
    });
  }
  deleteaccount(): void {

    const dialogRef = this.dialog.open(DeletealertComponent, {
      width: '250px',


    });

  }
  logout() {
    this.router.navigate(['']);
    this.authenticateService.setLoggedValue(false);
  }
}



