import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecepientserviceService } from '../service/recepientservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recepient, Donor } from '../model/model';
import { DonorProfileService } from '../service/donor-profile.service';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {


  public recepient: Recepient;
  public donor:Donor;
  constructor(private route: ActivatedRoute, private router: Router, private recepientProfileService: RecepientserviceService,private donorProfileService:DonorProfileService) { }

  ngOnInit() {
    this.verify();
  }

  verify() {
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      console.log(params)
      if(params["type"]=='donor')
      {
        this.donorProfileService.getDonorById(id).subscribe(data => {
          this.donor= data;
          console.log(this.donor);
          this.donor.isEmailVerified = "true";
          this.donorProfileService.updateDonor(this.donor, id).subscribe(data => {
          console.log(data);
        });
      });
         }
   if(params["type"]=='recepient')
    {
      this.recepientProfileService.getRecepientById(id).subscribe(data => {
        this.recepient = data;
        console.log(this.recepient);
        this.recepient.isEmailVerified = "true";
        this.recepientProfileService.updateRecepient(this.recepient, id).subscribe(data => {
        console.log(data);
      });
      });
  }
});
 }
}