import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DonorProfileService } from '../service/donor-profile.service';

@Component({
  selector: 'app-donor-registration-form',
  templateUrl: './donor-registration-form.component.html',
  styleUrls: ['./donor-registration-form.component.css']
})
export class DonorRegistrationFormComponent implements OnInit {

  donor: Donor;
  registrationForm: FormGroup;
  errorMsg: string;
  maxDate = new Date();
  constructor(private fb: FormBuilder, private donorProfileService: DonorProfileService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.maxLength(16),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,16}$')]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(16)]],
      aadhar: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]{12}$')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: this.fb.group({
        addressLine1: ['', [Validators.required, Validators.maxLength(40)]],
        addressLine2: ['', [Validators.required, Validators.maxLength(40)]],
        city: ['', [Validators.required, Validators.maxLength(40)]],
        state: ['', [Validators.required, Validators.maxLength(40)]],
        pin: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]]
      }),
      guardianList: this.fb.array([
        this.fb.group({
          name: ['', [Validators.required, Validators.maxLength(40)]],
          relation: ['', [Validators.required, Validators.maxLength(40)]],
          phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]{10}$')]],
          email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
          address: this.fb.group({
            addressLine1: ['', [Validators.required, Validators.maxLength(40)]],
            addressLine2: ['', [Validators.required, Validators.maxLength(40)]],
            city: ['', [Validators.required, Validators.maxLength(40)]],
            state: ['', [Validators.required, Validators.maxLength(40)]],
            pin: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]]
          }),
        })
      ]),
      medicalDetails: this.fb.group({
        bloodGroup: ['', Validators.required],
        height: ['', Validators.required],
        weight: ['', Validators.required],
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
    }, { validator: this.checkPasswords });

  }

  get guardianList() {
    return this.registrationForm.get('guardianList') as FormArray;
  }

  checkPasswords(form: FormGroup) {

    return form.controls.password.value === form.controls.confirmPassword.value ? null : { notSame: true };
  }

  register() {
    if (this.registrationForm.valid) {
      this.donorProfileService.saveDonor(this.registrationForm.value).subscribe(data => this.donor = data, error => this.errorMsg = error);
      console.log('api call success');
    }

  }
}
