import { Component, OnInit } from '@angular/core';
import { DonorProfileService } from '../service/donor-profile.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material';

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
  private donorId;
  durationInSeconds = 5;
  constructor(private route:ActivatedRoute,private router:Router,private donorProfileService:DonorProfileService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      this.donorId = id;
      this.createForm();
      this.donorProfileService.getDonorDetails(this.donorId).subscribe(data => {
        this.donor=data;
        console.log(this.donor);
        this.profileForm.controls['firstName'].setValue(this.donor.firstName);
        this.profileForm.controls['lastName'].setValue(this.donor.lastName);
        this.profileForm.controls['email'].setValue(this.donor.email); 
        this.profileForm.controls['phoneNumber'].setValue(this.donor.phoneNumber);
        this.profileForm.controls['aadhar'].setValue(this.donor.aadhar);
        this.profileForm.controls['gender'].setValue(this.donor.gender);
        this.profileForm.controls['addressLine1'].setValue(this.donor.address.addressLine1);
        this.profileForm.controls['addressLine2'].setValue(this.donor.address.addressLine2);
        this.profileForm.controls['city'].setValue(this.donor.address.city);
        this.profileForm.controls['state'].setValue(this.donor.address.state);
        this.profileForm.controls['pinCode'].setValue(this.donor.address.pinCode);
        this.profileForm.controls['height'].setValue(this.donor.medicalInfo.height);
        this.profileForm.controls['weight'].setValue(this.donor.medicalInfo.weight);
        let currentDate = new Date(this.donor.dob);
        this.profileForm.controls['dateOfBirth'].setValue(currentDate);
        this.profileForm.controls['bloodGroup'].setValue(this.donor.medicalInfo.bloodGroup);
        this.profileForm.controls['hiv'].setValue(this.donor.medicalInfo.disease.hiv);
        this.profileForm.controls['fits'].setValue(this.donor.medicalInfo.disease.fits);
        this.profileForm.controls['hepatitis'].setValue(this.donor.medicalInfo.disease.hepatitis);
        this.profileForm.controls['heartAttack'].setValue(this.donor.medicalInfo.disease.heartAttack);
        this.profileForm.controls['rabies'].setValue(this.donor.medicalInfo.disease.rabies);
        this.profileForm.controls['tuberculosis'].setValue(this.donor.medicalInfo.disease.tuberculosis);
        this.profileForm.controls['hyperTension'].setValue(this.donor.medicalInfo.disease.hyperTension);
        this.profileForm.controls['diabetes'].setValue(this.donor.medicalInfo.disease.diabetes);
        this.profileForm.controls['cancer'].setValue(this.donor.medicalInfo.disease.cancer);
        this.profileForm.controls['kidneyDisease'].setValue(this.donor.medicalInfo.disease.kidneyDisease);
        this.profileForm.controls['liverDisease'].setValue(this.donor.medicalInfo.disease.liverDisease);
      });
    });
  }

  createForm() {
    this.profileForm = new FormGroup({
      firstName : new FormControl({value: '', disabled: true}, Validators.required),
      lastName : new FormControl({value: '', disabled: true}, Validators.required),
      email: new FormControl({value: '', disabled: true}, Validators.required),
      phoneNumber: new FormControl({value: '', disabled: true}, Validators.required),
      aadhar: new FormControl({value: '', disabled: true}, Validators.required),
      gender: new FormControl({value: '', disabled: true}, Validators.required),
      addressLine1: new FormControl(Validators.required),
      addressLine2: new FormControl(Validators.required),
      city:new FormControl(Validators.required),
      state:new FormControl(Validators.required),
      pinCode:new FormControl({disabled: true}, Validators.required),
      height:new FormControl(Validators.required),
      weight:new FormControl(Validators.required),
      dateOfBirth:new FormControl({value: '', disabled: true}, Validators.required),
      bloodGroup:new FormControl({value: '', disabled: true}, Validators.required),
      hiv:new FormControl(Validators.required),
      fits:new FormControl(Validators.required),
      hepatitis:new FormControl(Validators.required),
      heartAttack:new FormControl(Validators.required),
      rabies:new FormControl(Validators.required),
      tuberculosis:new FormControl(Validators.required),
      hyperTension:new FormControl(Validators.required),
      diabetes:new FormControl(Validators.required),
      cancer:new FormControl(Validators.required),
      kidneyDisease:new FormControl(Validators.required),
      liverDisease:new FormControl(Validators.required)
    });
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;;
  }

  deletedonor(){
    var succes='false';
    this.donorProfileService.deleteDonor(this.donorId).subscribe((data)=>{
      succes = 'true';
      console.log("success");
    });
    this.donorProfileService.getDonorById(this.donorId).subscribe((data) => {
      this.donor = data;
      console.log(this.donor);
    });
  }

  updateDonor()
  {
    console.log(this.profileForm.get('phoneNumber').value);
    console.log(this.profileForm.get('addressLine1').value);
    this.donor.firstName = this.profileForm.get('firstName').value;
    this.donor.lastName = this.profileForm.get('lastName').value;
    this.donor.email = this.profileForm.get('email').value;
    this.donor.phoneNumber = this.profileForm.get('phoneNumber').value;
    this.donor.aadhar = this.profileForm.get('aadhar').value;
    this.donor.gender = this.profileForm.get('gender').value;
    this.donor.address.addressLine1 = this.profileForm.get('addressLine1').value;
    this.donor.address.addressLine2 = this.profileForm.get('addressLine2').value;
    this.donor.address.city = this.profileForm.get('city').value;
    this.donor.address.state = this.profileForm.get('state').value;
    this.donor.address.pinCode = this.profileForm.get('pinCode').value;
    this.donor.medicalInfo.height=this.profileForm.get('height').value;
    this.donor.medicalInfo.weight=this.profileForm.get('weight').value;
    this.donor.dob=this.profileForm.get('dateOfBirth').value;
    this.donor.medicalInfo.bloodGroup=this.profileForm.get('bloodGroup').value;
    this.donor.medicalInfo.disease.hiv=this.profileForm.get('hiv').value;
    this.donor.medicalInfo.disease.fits=this.profileForm.get('fits').value;
    this.donor.medicalInfo.disease.hepatitis=this.profileForm.get('hepatitis').value;
    this.donor.medicalInfo.disease.rabies=this.profileForm.get('rabies').value;
    this.donor.medicalInfo.disease.tuberculosis=this.profileForm.get('tuberculosis').value;
    this.donor.medicalInfo.disease.hyperTension=this.profileForm.get('hyperTension').value;
    this.donor.medicalInfo.disease.diabetes=this.profileForm.get('diabetes').value;
    this.donor.medicalInfo.disease.cancer=this.profileForm.get('cancer').value;
    this.donor.medicalInfo.disease.kidneyDisease=this.profileForm.get('kidneyDisease').value;
    this.donor.medicalInfo.disease.liverDisease=this.profileForm.get('liverDisease').value;
    this.donorProfileService.updateDonor(this.donor, this.donorId).subscribe();
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}