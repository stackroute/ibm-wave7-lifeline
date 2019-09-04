import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from 'src/app/service/authenticate.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private router:Router, private route:ActivatedRoute, private authenticateService: AuthenticateService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authenticateService.isLoggedIn;
    this.isLoggedIn$.subscribe(data => {
      console.log(data);
    });
  }


}
