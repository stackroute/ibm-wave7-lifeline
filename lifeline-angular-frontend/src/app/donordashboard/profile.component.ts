import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DonorProfileService } from '../service/donor-profile.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { Chart } from 'chart.js';
import { ReportgenerationserviceService } from '../service/reportgenerationservice.service';
import { Donor } from '../model/model';
import * as jspdf from 'jspdf';
import { AuthenticateService } from '../service/authenticate.service';
import { Observable } from 'rxjs';

export interface Section {
  name: string;
  updated: Date;

}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: []
})
export class ProfileComponent implements OnInit {

  public organsValues = [{
    id: 1,
    name: 'blood',
    donateOrNot: false,
  },
  {
    id: 2,
    name: 'boneMarrow',
    donateOrNot: false,
  },
  {
    id: 3,
    name: 'cornea',
    donateOrNot: false,
  },
  {
    id: 4,
    name: 'heart',
    donateOrNot: false,
  },
  {
    id: 5,
    name: 'kidney',
    donateOrNot: false,
  },
  {
    id: 6,
    name: 'liver',
    donateOrNot: false,
  },
  {
    id: 7,
    name: 'lungs',
    donateOrNot: false,
  },
  {
    id: 8,
    name: 'platelet',
    donateOrNot: false,
  }];
  isLoggedIn$: Observable<boolean>;
  loggedIn: boolean;
  public donor: Donor;
  public profileForm: FormGroup;
  private donorId;
  durationInSeconds = 5;
  BarChart = [];
  LineChart = [];
  organdonationreport;
  donorreport;
  constructor(private _reports: ReportgenerationserviceService, private route: ActivatedRoute, 
    private router: Router, private donorProfileService: DonorProfileService, 
    private _snackBar: MatSnackBar, private authenticationService: AuthenticateService) {
      // this.authenticationService.setLoggedValue(true);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      this.donorId = id;
      this.createForm();
      this.donorProfileService.getDonorDetails(this.donorId).subscribe(data => {
        this.donor = data;
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
        let currentDate = new Date(this.donor.dob);
        this.profileForm.controls['dateOfBirth'].setValue(currentDate);
        this.profileForm.controls['bloodGroup'].setValue(this.donor.medicalDetails.bloodGroup);
        this.profileForm.controls['hiv'].setValue(this.donor.medicalDetails.disease.hiv);
        this.profileForm.controls['fits'].setValue(this.donor.medicalDetails.disease.fits);
        this.profileForm.controls['hepatitis'].setValue(this.donor.medicalDetails.disease.hepatitis);
        this.profileForm.controls['heartAttack'].setValue(this.donor.medicalDetails.disease.heartAttack);
        this.profileForm.controls['rabies'].setValue(this.donor.medicalDetails.disease.rabies);
        this.profileForm.controls['tuberculosis'].setValue(this.donor.medicalDetails.disease.tuberculosis);
        this.profileForm.controls['hyperTension'].setValue(this.donor.medicalDetails.disease.hyperTension);
        this.profileForm.controls['diabetes'].setValue(this.donor.medicalDetails.disease.diabetes);
        this.profileForm.controls['cancer'].setValue(this.donor.medicalDetails.disease.cancer);
        this.profileForm.controls['kidneyDisease'].setValue(this.donor.medicalDetails.disease.kidneyDisease);
        this.profileForm.controls['liverDisease'].setValue(this.donor.medicalDetails.disease.liverDisease);
      });
    });
  }

  createForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl({ value: '', disabled: true }, Validators.required),
      lastName: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl({ value: '', disabled: true }, Validators.required),
      phoneNumber: new FormControl({ value: '' }, Validators.required),
      aadhar: new FormControl({ value: '', disabled: true }, Validators.required),
      gender: new FormControl({ value: '', disabled: true }, Validators.required),
      addressLine1: new FormControl(Validators.required),
      addressLine2: new FormControl(Validators.required),
      city: new FormControl(Validators.required),
      state: new FormControl(Validators.required),
      pinCode: new FormControl({ disabled: true }, Validators.required),
      dateOfBirth: new FormControl({ value: '', disabled: true }, Validators.required),
      bloodGroup: new FormControl({ value: '' }, Validators.required),
      hiv: new FormControl(Validators.required),
      fits: new FormControl(Validators.required),
      hepatitis: new FormControl(Validators.required),
      heartAttack: new FormControl(Validators.required),
      rabies: new FormControl(Validators.required),
      tuberculosis: new FormControl(Validators.required),
      hyperTension: new FormControl(Validators.required),
      diabetes: new FormControl(Validators.required),
      cancer: new FormControl(Validators.required),
      kidneyDisease: new FormControl(Validators.required),
      liverDisease: new FormControl(Validators.required)
    });
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;;
  }

  deletedonor() {
    var succes = 'false';
    this.donorProfileService.deleteDonor(this.donorId).subscribe((data) => {
      succes = 'true';
      console.log("success");
    });
    this.donorProfileService.getDonorById(this.donorId).subscribe((data) => {
      this.donor = data;
      console.log(this.donor);
    });
  }

  updateDonor() {
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
    this.donor.dob = this.profileForm.get('dateOfBirth').value;
    this.donor.medicalDetails.bloodGroup = this.profileForm.get('bloodGroup').value;
    this.donor.medicalDetails.disease.hiv = this.profileForm.get('hiv').value;
    this.donor.medicalDetails.disease.fits = this.profileForm.get('fits').value;
    this.donor.medicalDetails.disease.hepatitis = this.profileForm.get('hepatitis').value;
    this.donor.medicalDetails.disease.rabies = this.profileForm.get('rabies').value;
    this.donor.medicalDetails.disease.tuberculosis = this.profileForm.get('tuberculosis').value;
    this.donor.medicalDetails.disease.hyperTension = this.profileForm.get('hyperTension').value;
    this.donor.medicalDetails.disease.diabetes = this.profileForm.get('diabetes').value;
    this.donor.medicalDetails.disease.cancer = this.profileForm.get('cancer').value;
    this.donor.medicalDetails.disease.kidneyDisease = this.profileForm.get('kidneyDisease').value;
    this.donor.medicalDetails.disease.liverDisease = this.profileForm.get('liverDisease').value;
    this.donorProfileService.updateDonor(this.donor, this.donorId).subscribe();
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });

    this._reports.donorreports()
      .subscribe(res => {
      this.donorreport = res
        // {
        //   let donor_id=res['list'].map(res=>res.main.id)
        //   console.log(res);

        // let noofdonors=[]
        // donor_id.forEach((res)=>{
        //   let donorid=new Date(res*10)
        //   noofdonors.push(donorid.toLocaleTimeString('en',{year:'numeric',month:'short',day:'numeric'}))
        // })
        console.log(this.donorreport);
        this.BarChart = new Chart('barChart',
          {
            type: 'bar',
            animationEnabled: true,
            data:
            {
              labels: ["Number of donors registered"],
              datasets:
                [{
                  // label: 'number of donors registered in each month',
                  // data: [9, 7, 3, 5, 10, 15, 16, 62, , 3, 1, 9],
                  // data: this.donorreport,
                  data: [this.donorreport],
                  // fill: false,
                  // lineTension: 0.7,
                  borderColor: "blue",
                  borderWidth: 2
                }]
            },
            options:
            {
              title: {
                text: "",
                display: true,
                responsive: true
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 50,
                    stepSize: 5,
                  }
                }]

              }


            }
          }
        );
      });


    this._reports.organdonationreports()
      .subscribe(res => {
        this.organdonationreport = res
        console.log(this.organdonationreport);
        this.BarChart = new Chart('barChart1',
          {
            type: 'line',
            animationEnabled: true,
            data:
            {
              labels: ["Blood", "BoneMarrow", "Cornea", "Heart", "Kidney", "Liver", "Lungs", "Platelet"],
              datasets:
                [{
                  // label: 'number of recepients registered in each month',

                  data: [this.organdonationreport[0], this.organdonationreport[1], this.organdonationreport[2], this.organdonationreport[3], this.organdonationreport[4], this.organdonationreport[5], this.organdonationreport[6], this.organdonationreport[7]],
                  fill: false,
                  lineTension: 0.2,
                  borderColor: "blue",
                  borderWidth: 2
                }]
            },
            options:
            {
              title: {
                text: "",
                display: true,
                responsive: true
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 50,
                    stepSize: 5,
                    // suggestedMin: 0,
                    // suggestedMax: 100
                  }
                }]

              }


            }
          }
        );
      });


  }
  @ViewChild('content',{static:false}) content: ElementRef;
 makePdf() {
   let doc = new jspdf();
   doc.addHTML(this.content.nativeElement, function() {
      doc.save("Donorcard.pdf");
   });
 }
}