import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DonorProfileService } from '../service/donor-profile.service';
import { RecepientserviceService } from '../service/recepientservice.service';
import { User } from '../model/User';
import { Donor, Recepient } from '../model/model';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  private ConfirmNewPassword;
  private user;
  private donor: Donor;
  private recepient: Recepient;
  constructor(private authenticateService: AuthenticateService, private donorProfileService: DonorProfileService, private recepientserviceService: RecepientserviceService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  //   reset() {
  //     console.log(this.ConfirmNewPassword);
  //     this.authenticateService.resetpassword(this.ConfirmNewPassword)
  //     .subscribe(data => {
  //       console.log(data);
  //     });
  // }
  reset() {
    let email;
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      console.log(id)
      console.log(params["role"]);
      if (params["role"] === 'donor') {
        this.donorProfileService.getDonorById(id).subscribe(data => {
          email = data.email;
          let user = new User();
          user.username = email;
          user.password = this.ConfirmNewPassword;
          user.role = params.role;
          console.log(user);
          this.authenticateService.resetpassword(user)
            .subscribe(data => {
              console.log(data);
            });
        });


      }

      else if (params["role"] === 'recepient') {
      console.log(params["role"]);
        this.recepientserviceService.getRecepientById(id).subscribe(data => {
          email = data.email;
          let user = new User();
          user.username = email;
          user.password = this.ConfirmNewPassword;
          user.role = params.role;
          console.log(user);
          this.authenticateService.resetpassword(user)
            .subscribe(data => {
              console.log(data);
            });
        });
      }

    })
  }
}
