import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../service/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  opened: false;
  loggedIn: boolean;

  constructor(private router:Router, private route:ActivatedRoute, private authenticateService: AuthenticateService) { }

  ngOnInit() {
    this.authenticateService.loggedIn.subscribe(data => {
      this.loggedIn = data;
      console.log(this.loggedIn);
    })
    this.loggedIn = this.authenticateService.getLoggedValue()
  }
}
