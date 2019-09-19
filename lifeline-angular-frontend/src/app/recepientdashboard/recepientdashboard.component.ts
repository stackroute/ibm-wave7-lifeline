import { Component, OnInit } from '@angular/core';
import { RecepientserviceService } from '../service/recepientservice.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { Recepient } from '../model/model';

@Component({
  selector: 'app-recepientdashboard',
  templateUrl: './recepientdashboard.component.html',
  styleUrls: ['./recepientdashboard.component.css']
})
export class RecepientdashboardComponent implements OnInit {

  public requestOrganForm: FormGroup;
  public profileForm: FormGroup;
  private recepientId;
  public recepients: Recepient;
  private donors: Object;
  durationInSeconds = 5;
  formbuilder: any;
  dataSource: Recepient;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private recepientProfileService: RecepientserviceService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recepientId = params["id"];
      console.log(this.recepientId);
      this.recepientProfileService.getRecepientById(this.recepientId).subscribe(data => {
        this.recepients = data;
        this.dataSource = data;
        console.log(this.recepients);
      });
    });


    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      this.recepientId = id;
      this.createForm();
      this.recepientProfileService.getRecepientDetails(this.recepientId).subscribe(data => {
        this.recepients = data;
        console.log(this.recepients);
        this.profileForm.controls['firstName'].setValue(this.recepients.firstName);
        this.profileForm.controls['lastName'].setValue(this.recepients.lastName);
        this.profileForm.controls['email'].setValue(this.recepients.email);
        this.profileForm.controls['phoneNumber'].setValue(this.recepients.phoneNumber);
        this.profileForm.controls['aadhar'].setValue(this.recepients.aadhar);
        this.profileForm.controls['gender'].setValue(this.recepients.gender);
        this.profileForm.controls['addressLine1'].setValue(this.recepients.address.addressLine1);
        this.profileForm.controls['addressLine2'].setValue(this.recepients.address.addressLine2);
        this.profileForm.controls['city'].setValue(this.recepients.address.city);
        this.profileForm.controls['state'].setValue(this.recepients.address.state);
        this.profileForm.controls['pinCode'].setValue(this.recepients.address.pinCode)
        let currentDate = new Date(this.recepients.dob);
        this.profileForm.controls['dateOfBirth'].setValue(currentDate);
        this.profileForm.controls['bloodGroup'].setValue(this.recepients.bloodGroup);

      });
    });
  }

  createForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl({ value: '', disabled: true }, Validators.required),
      lastName: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl({ value: '' }, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phoneNumber: new FormControl([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^$|[0-9]{10}')]),
      aadhar: new FormControl({ value: '', disabled: true }, Validators.required),
      gender: new FormControl({ value: '', disabled: true }, Validators.required),
      addressLine1: new FormControl([Validators.required, Validators.maxLength(40)]),
      addressLine2: new FormControl([Validators.required, Validators.maxLength(40)]),
      city: new FormControl([Validators.required, Validators.maxLength(40)]),
      state: new FormControl([Validators.required, Validators.maxLength(40)]),
      pinCode: new FormControl([Validators.required, Validators.maxLength(6), Validators.pattern('^$|[0-9]{6}')]),
      dateOfBirth: new FormControl({ value: '', disabled: true }, Validators.required),
      bloodGroup: new FormControl({ value: '', disabled: true }, Validators.required),

    });
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;;
  }

  updateRecepient(recepients) {
    console.log(this.profileForm.get('phoneNumber').value);
    console.log(this.profileForm.get('addressLine1').value);
    this.recepients.firstName = this.profileForm.get('firstName').value;
    this.recepients.lastName = this.profileForm.get('lastName').value;
    this.recepients.email = this.profileForm.get('email').value;
    this.recepients.phoneNumber = this.profileForm.get('phoneNumber').value;
    this.recepients.aadhar = this.profileForm.get('aadhar').value;
    this.recepients.gender = this.profileForm.get('gender').value;
    this.recepients.address.addressLine1 = this.profileForm.get('addressLine1').value;
    this.recepients.address.addressLine2 = this.profileForm.get('addressLine2').value;
    this.recepients.address.city = this.profileForm.get('city').value;
    this.recepients.address.state = this.profileForm.get('state').value;
    this.recepients.address.pinCode = this.profileForm.get('pinCode').value;
    this.recepients.dob = this.profileForm.get('dateOfBirth').value;
    this.recepients.bloodGroup = this.profileForm.get('bloodGroup').value;
    this.recepientProfileService.updateRecepient(this.recepients, this.recepientId).subscribe();
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
};




