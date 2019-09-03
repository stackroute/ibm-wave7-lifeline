import { Component, OnInit } from '@angular/core';
import { DonorProfileService } from '../service/donor-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public donor: Donor;
  public profileForm: FormGroup;
  private id=3;
  constructor(private route:ActivatedRoute,private router:Router,private donorservice:DonorProfileService) { }

  ngOnInit() {
    this.donorservice.getDonorById(this.id).subscribe((data) => {
      this.donor = data;
      console.log(this.donor);
    });
    this.createForm();
  }

  createForm() {
    this.profileForm = new FormGroup({
      phoneNumber: new FormControl(this.donor.phoneNumber),
      addressLine1: new FormControl(this.donor.address.addressLine1),
      addressLine2: new FormControl(),
      city:new FormControl(),
      state:new FormControl(),
      pinCode:new FormControl(),
      height:new FormControl(),
      weight:new FormControl(),
      HIV:new FormControl()
    });
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;;
  }

  updateDonor(donor)
  {
    console.log(this.profileForm.get('phoneNumber').value);
    console.log(this.profileForm.get('addressLine1').value);
    this.donor.phoneNumber = this.profileForm.get('phoneNumber').value;
    this.donor.address.addressLine1 = this.profileForm.get('addressLine1').value;
    this.donor.address.addressLine2 = this.profileForm.get('addressLine2').value;
    this.donor.address.city = this.profileForm.get('city').value;
    this.donor.address.state = this.profileForm.get('state').value;
    this.donor.address.pinCode = this.profileForm.get('pinCode').value;
    this.donor.medicalInfo.height=this.profileForm.get('height').value;
    this.donor.medicalInfo.weight=this.profileForm.get('weight').value;
    console.log(donor);
    // this.donorservice.updateDonor(donor).subscribe();
  }


  
}