import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DonorProfileService } from '../service/donor-profile.service';
import { HttpResponse } from '@angular/common/http';
import { Donor } from '../model/model';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VerificationAlertComponent } from '../recepientregistrationformcomponent/verification-alert/verification-alert.component';

@Component({
  selector: 'app-donor-registration-form',
  templateUrl: './donor-registration-form.component.html',
  styleUrls: ['./donor-registration-form.component.css'],
})
export class DonorRegistrationFormComponent implements OnInit {

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
  donor:Donor
  registrationForm: FormGroup;
  errorMsg: string;
  maxDate = new Date();
  constructor(private fb: FormBuilder, private donorProfileService: DonorProfileService, private router: Router, public dialog: MatDialog) { }
  selectedFiles: FileList;
  currentFileUpload: File;
  ngOnInit() {
    this.registrationForm = this.fb.group({
      donorId: [''],
      userType: ['donor'],
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
      Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(16)]],
      aadhar: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]{12}$')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      createdDate: [new Date()],
      emailVerified: [false],
      address: this.fb.group({
        addressLine1: ['', [Validators.required, Validators.maxLength(40)]],
        addressLine2: ['', [Validators.required, Validators.maxLength(40)]],
        city: ['', [Validators.required, Validators.maxLength(40)]],
        state: ['', [Validators.required, Validators.maxLength(40)]],
        pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]]
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
            pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]]
          }),
        })
      ]),
      medicalDetails: this.fb.group({
        bloodGroup: ['A+', Validators.required],
        bodyMassIndex: [''],
        hlaType: [''],
        liverAttenuationIndex: [''],
        lungSize: [''],
        plateletCount: [''],
        rhFactor: [''],
        disease: this.fb.group({
          cancer: [false],
          diabetes: [false],
          fits: [false],
          heartAttack: [false],
          hepatitis: [false],
          hiv: [false],
          hyperTension: [false],
          kidneyDisease: [false],
          liverDisease: [false],
          rabies: [false],
          tuberculosis: [false],
        }),
        organList: this.fb.array([
          this.fb.group({
            id: [this.organsValues[0].id],
            name: [this.organsValues[0].name],
            donateOrNot: [this.organsValues[0].donateOrNot],
          }),
        ])
      }),
      formList: this.fb.array([
        this.fb.group({
          id: [''],
          fileName: [''],
          data: [''],

        })
      ])
    }, { validator: this.checkPasswords });

    for (let i = 1; i < 8; i++) {
      this.organList.push(this.fb.group({
        id: [this.organsValues[i].id],
        name: [this.organsValues[i].name],
        donateOrNot: [this.organsValues[i].donateOrNot],

      }));
    }
  }

  get guardianList() {
    return this.registrationForm.get('guardianList') as FormArray;
  }

  get formList() {
    return this.registrationForm.get('formList') as FormArray;
  }
  get disease() {
    return this.registrationForm.get('medicalDetails').get('disease') as FormGroup;
  }
  get organList() {
    return this.registrationForm.get('medicalDetails').get('organList') as FormArray;
  }
  checkPasswords(form: FormGroup) {

    return form.controls.password.value === form.controls.confirmPassword.value ? null : { notSame: true };
  }

  FileSelected(event) {
    this.selectedFiles = event.target.files;
  }

  register() {
    // if (this.registrationForm.valid) {
      this.currentFileUpload = this.selectedFiles.item(0);
      this.donorProfileService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });
      this.selectedFiles = undefined;
      console.log(this.registrationForm.value);
      this.donorProfileService.saveDonor(this.registrationForm.value).subscribe(data => {
        this.donor = data
        const dialogRef = this.dialog.open(VerificationAlertComponent, {
          width: '250px',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
  
        this.donorProfileService.sendMail(this.donor.id)
          .subscribe(data => {
            console.log(data);
          });
        });
        error => {
          this.errorMsg = error;
        }
      // this.router.navigate(['']);
    // }
  }
 
  check() {
    let diseaseGroup = this.disease;

    if (diseaseGroup.get('hiv').value || diseaseGroup.get('hepatitis').value ||
      diseaseGroup.get('rabies').value || diseaseGroup.get('tuberculosis').value ||
      diseaseGroup.get('fits').value || diseaseGroup.get('hyperTension').value ||
      diseaseGroup.get('diabetes').value) {
      console.log('Blood');
      // this.organList.value.forEach(element => {
      //   console.log(element.name);
      //   console.log(element.donateOrNot);
      // });
      this.organList.value[0].donateOrNot = true;
    } else {
      console.log('No Blood');
      this.organList.value[0].donateOrNot = false;
    }
  }
  checkcornea() {
    let diseaseGroup = this.disease;
    if (diseaseGroup.get('hiv').value || diseaseGroup.get('hepatitis').value ||
      diseaseGroup.get('rabies').value || diseaseGroup.get('heartAttack').value ||
      diseaseGroup.get('cancer').value) {
      console.log('cornea');
      this.organList.value[2].donateOrNot = true;
      this.organList.value[7].donateOrNot = true;
    } else {
      console.log('No cornea');
      this.organList.value[2].donateOrNot = false;
      this.organList.value[7].donateOrNot = false;
    }
  }


  checkLungs() {
    let diseaseGroup = this.disease;
    if (diseaseGroup.get('hiv').value ||
      diseaseGroup.get('hepatitis').value ||
      diseaseGroup.get('rabies').value ||
      diseaseGroup.get('heartAttack').value ||
      diseaseGroup.get('cancer').value ||
      diseaseGroup.get('kidneyDisease').value ||
      diseaseGroup.get('liverDisease').value) {
      console.log('lungs');
      this.organList.value[6].donateOrNot = true;
    } else {
      console.log('No lungs');
      this.organList.value[6].donateOrNot = false;
    }
  }
  checkheartliver() {
    let diseaseGroup = this.disease;
    if (diseaseGroup.get('hiv').value ||
      diseaseGroup.get('hepatitis').value ||
      diseaseGroup.get('rabies').value ||
      diseaseGroup.get('heartAttack').value ||
      diseaseGroup.get('diabetes').value ||
      diseaseGroup.get('cancer').value) {
      console.log('heartliver');
      this.organList.value[3].donateOrNot = true;
      this.organList.value[5].donateOrNot = true;
    } else {
      console.log('No heart liver');
      this.organList.value[3].donateOrNot = false;
      this.organList.value[5].donateOrNot = false;
    }
  }
  checkkidney() {
    let diseaseGroup = this.disease;
    if (diseaseGroup.get('hiv').value ||
      diseaseGroup.get('hepatitis').value ||
      diseaseGroup.get('rabies').value ||
      diseaseGroup.get('heartAttack').value ||
      diseaseGroup.get('diabetes').value ||
      diseaseGroup.get('cancer').value ||
      diseaseGroup.get('kidneyDisease').value ||
      diseaseGroup.get('liverDisease').value) {
      console.log('kidney');
      this.organList.value[4].donateOrNot = true;
    }  else {
      console.log('No kidney');
      this.organList.value[4].donateOrNot = false;

    }
  }
  checkBoneMarrow() {
    const diseaseGroup = this.disease;
    if (diseaseGroup.get('hiv').value ||
      diseaseGroup.get('hepatitis').value ||
      diseaseGroup.get('rabies').value ||
      diseaseGroup.get('heartAttack').value ||
      diseaseGroup.get('kidneyDisease').value ||
      diseaseGroup.get('liverDisease').value) {
      console.log('boneMarrow')
      this.organList.value[1].donateOrNot = true;

    } else {
      console.log('No  boneMarrow');
      this.organList.value[1].donateOrNot = false;

    }
  }

}
