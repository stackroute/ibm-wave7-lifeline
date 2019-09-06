import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  loggedIn: boolean;

  constructor(private router:Router, private route:ActivatedRoute, private authenticateService: AuthenticateService,public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authenticateService.logged;
    this.isLoggedIn$.subscribe(data => {
      this.loggedIn = data;
    });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
      
    });

    
  }
  
}
