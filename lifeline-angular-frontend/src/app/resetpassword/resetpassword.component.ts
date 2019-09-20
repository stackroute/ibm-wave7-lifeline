import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  public resetForm: FormGroup;
  constructor(private authenticateService: AuthenticateService, private donorProfileService: DonorProfileService, private recepientserviceService: RecepientserviceService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
      Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
      Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')]),
    });

  }

  reset() {
    let email;
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      console.log(params["role"]);
      if (params["role"] === 'donor') {
        console.log('inside donor');
        this.donorProfileService.getDonorById(id).subscribe(data => {
          console.log('1')
          email = data.email;
          console.log('2')
          let user = new User();
          console.log('3')
          user.username = email;
          console.log('4')
          console.log(user.username);
          user.password = this.resetForm.controls['newPassword'].value;
          console.log(user.password);

          user.role = params.role;
          this.authenticateService.resetpassword(user)
            .subscribe(data => {
              console.log(data);
            });
        });
      } else if (params["role"] === 'recepient') {
        console.log('inside recepient');
        this.recepientserviceService.getRecepientById(id).subscribe(data => {
          email = data.email;
          let user = new User();
          user.username = email;
          user.password = this.resetForm.controls['confirmPassword'].value;
          user.role = params.role;
          console.log(user);
          this.authenticateService.resetpassword(user)
            .subscribe(data => {
              console.log(data);
            });
        });
      }
      this.router.navigate(['']);
    })
  }
}
