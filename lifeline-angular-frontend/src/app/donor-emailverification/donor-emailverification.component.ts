import { Component, OnInit } from '@angular/core';
import { Donor } from '../model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorProfileService } from '../service/donor-profile.service';

@Component({
  selector: 'app-donor-emailverification',
  templateUrl: './donor-emailverification.component.html',
  styleUrls: ['./donor-emailverification.component.css']
})
export class DonorEmailverificationComponent implements OnInit {

  public donor: Donor;
  constructor(private route: ActivatedRoute, private router: Router, private donorProfileservice: DonorProfileService) { }

  

  ngOnInit() {
    this.verifyRecepient();
  }

  verifyRecepient() {
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      this.donorProfileservice.getDonorById(id).subscribe(data => {
        this.donor = data;
        console.log(this.donor);
        this.donor.isEmailVerified = "true";
        this.donorProfileservice.updateDonor(this.donor, id).subscribe(data => {
        console.log(data);
      });
      });
    });
  }
}