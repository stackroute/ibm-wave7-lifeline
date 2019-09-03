import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  private ConfirmNewPassword;
  constructor(private authenticateService: AuthenticateService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
  }
  reset() {
    console.log(this.ConfirmNewPassword);
    this.authenticateService.resetpassword(this.ConfirmNewPassword)
    .subscribe(data => {
      console.log(data);
    });
}
}
