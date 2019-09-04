import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DonorProfileService } from '../service/donor-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-registration-form',
  templateUrl: './donor-registration-form.component.html',
  styleUrls: ['./donor-registration-form.component.css']
})
export class DonorRegistrationFormComponent implements OnInit {

  donor: Donor;
  registrationForm: FormGroup;
  errorMsg: string;
  constructor(private fb: FormBuilder, private donorProfileService: DonorProfileService, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      aadhar: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pinCode: ['', Validators.required],
        userType:['donor'],
      }),
      guardianList: this.fb.array([
        this.fb.group({
          name: [''],
          relation: [''],
          phoneNumber: [''],
          email: [''],
          address: this.fb.group({
            addressLine1: ['', Validators.required],
            addressLine2: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            pinCode: ['', Validators.required]
          }),
        })
      ]),
      medicalDetails: this.fb.group({
        bloodGroup: [''],
        height: [''],
        weight: [''],
        disease: this.fb.group({
          cancer: [''],
          diabetes: [''],
          fits: [''],
          heartAttack: [''],
          hepatitis: [''],
          hiv: [''],
          hyperTension: [''],
          kidneyDisease: [''],
          liverDisease: [''],
          rabies: [''],
          tuberculosis: [''],
        }),
        organs: this.fb.group({
          blood: [''],
          boneMarrow: [''],
          cornea: [''],
          heart: [''],
          kidney: [''],
          liver: [''],
          lungs: [''],
          platelet: [''],
        }),
      })
    });

  }

  get guardianList() {
    return this.registrationForm.get('guardianList') as FormArray;
  }

  

  register() {
    console.log(this.registrationForm);
    this.donorProfileService.saveDonor(this.registrationForm.value).subscribe(
      data => {
        this.donor = data,
        this.router.navigate(['/login']); 
      },
      error => {
        this.errorMsg = error
      });

  }
}
