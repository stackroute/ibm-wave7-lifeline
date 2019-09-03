import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DonorProfileService } from '../service/donor-profile.service';
import { RecepientserviceService } from '../service/recepientservice.service';

@Component({
  selector: 'app-recepientregistrationformcomponent',
  templateUrl: './recepientregistrationformcomponent.component.html',
  styleUrls: ['./recepientregistrationformcomponent.component.css']
})
export class RecepientregistrationformcomponentComponent implements OnInit {

  recepient: Recepient;
  registrationForm: FormGroup;
  errorMsg: string;
  constructor(private fb: FormBuilder, private recepientprofileservice:RecepientserviceService) { }


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
      bloodGroup: ['', Validators.required],
      userType: ['recepient'],
      address: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pin: ['', Validators.required],
    
      }),
    })
  }

  register() {
    console.log(this.registrationForm);
    this.recepientprofileservice.saveRecepient(this.registrationForm.value).subscribe(data => this.recepient = data, error => this.errorMsg = error);
    console.log('api call success');

  }

}
