import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  maxDate=new Date();

  constructor(private fb: FormBuilder, private recepientprofileservice:RecepientserviceService) { }


  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required,Validators.maxLength(40)],
      lastName: ['', Validators.required,Validators.maxLength(40)],
      phoneNumber: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^$|[0-9]{10}')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.maxLength(16),Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[#$^+=!*()@%&]).{8,16}$')]],
      confirmPassword: ['', Validators.required],
      aadhar: ['', [Validators.required,Validators.maxLength(12),Validators.minLength(12),Validators.pattern('^$|[0-9]{12}')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      userType: ['recepient'],
      address: this.fb.group({
        addressLine1: ['', [Validators.required,Validators.maxLength(40)]],
        addressLine2: ['', [Validators.required,Validators.maxLength(40)]],
        city: ['', [Validators.required,Validators.maxLength(40)]],
        state: ['', [Validators.required,Validators.maxLength(40)]],
        pinCode: ['', [Validators.required,Validators.maxLength(6),Validators.pattern('^$|[0-9]{6}')]],
    
      }),
    })
  }
  checkPasswords(form: FormGroup) {
    return form.controls.password.value === form.controls.confirmPassword.value ? null : { notSame: true };
  }

  register() {
    console.log(this.registrationForm);
    this.recepientprofileservice.saveRecepient(this.registrationForm.value).subscribe(data => this.recepient = data, error => this.errorMsg = error);
    console.log('api call success');

  }
   
}