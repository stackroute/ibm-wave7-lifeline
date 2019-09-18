import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DonorProfileService } from '../service/donor-profile.service';
import { RecepientserviceService } from '../service/recepientservice.service';
import { User } from '../model/User';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  private ConfirmNewPassword;
  public user:User;
  constructor(private authenticateService: AuthenticateService,private donorProfileService:DonorProfileService,private recepientserviceService :RecepientserviceService, private formBuilder: FormBuilder,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }
//   reset() {
//     console.log(this.ConfirmNewPassword);
//     this.authenticateService.resetpassword(this.ConfirmNewPassword)
//     .subscribe(data => {
//       console.log(data);
//     });
// }
reset()
{
  let email;
    this.route.queryParams.subscribe(params=>{
    let id = params["id"];
    console.log(id)
    if (params.role === 'donor') {
      this.donorProfileService.getDonorById(id).subscribe(data=>{
         email = data.email;
      });

    }
    else if (params.role === 'recepient') {
      this.recepientserviceService.getRecepientById(id).subscribe(data=>{
          email=data.email;
      });   
    } 
  this.user.username=email;
  this.user.password=this.ConfirmNewPassword;
  this.user.role=params.role;
    this.authenticateService.resetpassword(this.user)
    .subscribe(data => {
      console.log(data);
    });
  })
}
}
