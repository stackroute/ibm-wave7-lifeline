import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DonorProfileService } from '../service/donor-profile.service';
import { RecepientserviceService } from '../service/recepientservice.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VerificationAlertComponent } from './verification-alert/verification-alert.component';
import { Recepient } from '../model/model';

@Component({
  selector: 'app-recepientregistrationformcomponent',
  templateUrl: './recepientregistrationformcomponent.component.html',
  styleUrls: ['./recepientregistrationformcomponent.component.css']
})
export class RecepientregistrationformcomponentComponent implements OnInit {

  recepient: Recepient;
  registrationForm: FormGroup;
  errorMsg: string;
  maxDate = new Date();

  constructor(private fb: FormBuilder, private recepientprofileservice: RecepientserviceService, private router: Router, public dialog: MatDialog) { }


  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^$|[0-9]{10}')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
        // Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')
      ]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(16)]],
      aadhar: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern('^$|[0-9]{12}')]],
      dob: ['', Validators.required],
      createdDate: [new Date()],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      currentDate: [new Date()],
      userType: ['recepient'],
      address: this.fb.group({
        addressLine1: ['', [Validators.required, Validators.maxLength(40)]],
        addressLine2: ['', [Validators.required, Validators.maxLength(40)]],
        city: ['', [Validators.required, Validators.maxLength(40)]],
        state: ['', [Validators.required, Validators.maxLength(40)]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^$|[0-9]{6}')]],

      }),
    })
  }
  checkPasswords(form: FormGroup) {
    return form.controls.password.value === form.controls.confirmPassword.value ? null : { notSame: true };
  }

  register() {
    console.log(this.registrationForm);
    this.recepientprofileservice.saveRecepient(this.registrationForm.value).subscribe(data => {
      this.recepient = data,
      this.recepientprofileservice.sendMail(this.recepient.id)
        .subscribe(data => {
          console.log(data);
        });
      const dialogRef = this.dialog.open(VerificationAlertComponent, {
        width: '250px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    },


      error => {
        this.errorMsg = error;
      });
  //  this.router.navigate(['']);
  }




}