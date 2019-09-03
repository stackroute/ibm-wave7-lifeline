import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  private emailid;

  constructor(private authenticateService: AuthenticateService, private formBuilder: FormBuilder,private router:Router) { }
  
  ngOnInit() {
  }
  
  reset() {
    console.log(this.emailid);
    this.authenticateService.forgotpassword(this.emailid)
    .subscribe(data => {
      console.log(data);
    });
  }
// forgotpassword(){
//   this.router.navigate(['/forgotPassword']);
// }
}
