import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DonorProfileService } from '../service/donor-profile.service';
import { HttpResponse } from '@angular/common/http';
import { Donor } from '../model/model';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donor-registration-form',
  templateUrl: './donor-registration-form.component.html',
  styleUrls: ['./donor-registration-form.component.css'],
})
export class DonorRegistrationFormComponent implements OnInit {

  organ = [false, false, false, false, false, false, false, false];
  donor: Donor;
  registrationForm: FormGroup;
  errorMsg: string;
  maxDate = new Date();
  constructor(private fb: FormBuilder, private donorProfileService: DonorProfileService, private router: Router) { }
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
          blood: [false],
          boneMarrow: [false],
          cornea: [false],
          heart: [false],
          kidney: [false],
          liver: [false],
          lungs: [false],
          platelet: [false],
        }),
        // organs: this.fb.array([
        //   this.fb.group({
        //     id: [''],
        //     name: [''],
        //     donateOrNot: [''],
        //   }),
        // ])
      }),
      formList: this.fb.array([
        this.fb.group({
          id: [''],
          fileName: [''],
          data: [''],

        })
      ])
    }, { validator: this.checkPasswords });

  }

  get guardianList() {
    return this.registrationForm.get('guardianList') as FormArray;
  }

  get formList() {
    return this.registrationForm.get('formList') as FormArray;
  }

  get organList() {
    return this.registrationForm.get('organs') as FormArray;
  }
  checkPasswords(form: FormGroup) {

    return form.controls.password.value === form.controls.confirmPassword.value ? null : { notSame: true };
  }

  register() {
    console.log("hello");
    if (this.registrationForm.valid) {
      // this.currentFileUpload = this.selectedFiles.item(0);
      // this.donorProfileService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      //   if (event instanceof HttpResponse) {
      //     console.log('File is completely uploaded!');
      //   }
      // });
      // this.selectedFiles = undefined;
      this.donorProfileService.saveDonor(this.registrationForm.value).subscribe(data => {
        this.donor = data
        this.router.navigate(['']);
      }
        , error => {
          this.errorMsg = error,
          console.log(this.errorMsg)
        });
      console.log('api call success');

    }
  }

    getDisease() {
      return this.registrationForm.get('medicalDetails').get('disease') as FormGroup;
    }
    getOrgans() {
      return this.registrationForm.get('medicalDetails').get('organs') as FormGroup;
    }
    check() {
      let diseaseGroup = this.getDisease();
      let organsGroup = this.getOrgans();
      //   for (let x in diseaseGroup.getRawValue()) {
      //     console.log(x)
      //     if (x === ('hiv' || 'rabies' || 'Hepatitis') && diseaseGroup.get(x).value) {
      //       console.log('True ' + x)
      //       organsGroup.disable();
      //     }
      //     else if (x === ('hiv' || 'rabies' || 'hepatitis') && diseaseGroup.get(x).value === false) {
      //       console.log('False ' + x)
      //       organsGroup.enable();
      //     }
      //   }
      // }
      if (diseaseGroup.get('hiv').value || diseaseGroup.get('hepatitis').value ||
        diseaseGroup.get('rabies').value || diseaseGroup.get('tuberculosis').value ||
        diseaseGroup.get('fits').value || diseaseGroup.get('hyperTension').value ||
        diseaseGroup.get('diabetes').value) {
        console.log('Blood')
        organsGroup.get('blood').disable();
      } else {
        console.log('No Blood');
        // organsGroup.get('heart').enable();
        organsGroup.get('blood').enable();
      }
    }
    checkcornea() {
      let diseaseGroup = this.getDisease();
      let organsGroup = this.getOrgans();
      console.log(organsGroup)
      if (diseaseGroup.get('hiv').value || diseaseGroup.get('hepatitis').value ||
        diseaseGroup.get('rabies').value || diseaseGroup.get('heartAttack').value ||
        diseaseGroup.get('cancer').value) {
        console.log('cornea')
        organsGroup.get('cornea').disable();
        organsGroup.get('platelet').disable();
      } else {
        console.log('No cornea');
        organsGroup.get('cornea').enable();
        organsGroup.get('platelet').enable();
      }
    }
    

    FileSelected(event) {
      this.selectedFiles = event.target.files;
    }
    checkLungs() {
      let diseaseGroup = this.getDisease();
      let organsGroup = this.getOrgans();
      if (diseaseGroup.get('hiv').value ||
        diseaseGroup.get('hepatitis').value ||
        diseaseGroup.get('rabies').value ||
        diseaseGroup.get('heartAttack').value ||
        diseaseGroup.get('cancer').value ||
        diseaseGroup.get('kidneyDisease').value ||
        diseaseGroup.get('liverDisease').value) {
        console.log('lungs')
        organsGroup.get('lungs').disable();
        console.log(organsGroup)
      } else {
        console.log('No lungs');
        organsGroup.get('lungs').enable();
        console.log(organsGroup);
      }
    }
    checkheartliver() {
      let diseaseGroup = this.getDisease();
      let organsGroup = this.getOrgans();
      if (diseaseGroup.get('hiv').value ||
        diseaseGroup.get('hepatitis').value ||
        diseaseGroup.get('rabies').value ||
        diseaseGroup.get('heartAttack').value ||
        diseaseGroup.get('diabetes').value ||
        diseaseGroup.get('cancer').value) {
        console.log('heartliver')
        organsGroup.get('heart').disable();
        organsGroup.get('liver').disable();
        console.log(organsGroup)
      } else {
        console.log('No heart liver');
        organsGroup.get('heart').enable();
        organsGroup.get('liver').enable();
        console.log(organsGroup);
      }
    }
    checkkidney() {
      let diseaseGroup = this.getDisease();
      let organsGroup = this.getOrgans();
      if (diseaseGroup.get('hiv').value ||
        diseaseGroup.get('hepatitis').value ||
        diseaseGroup.get('rabies').value ||
        diseaseGroup.get('heartAttack').value ||
        diseaseGroup.get('diabetes').value ||
        diseaseGroup.get('cancer').value ||
        diseaseGroup.get('kidneyDisease').value ||
        diseaseGroup.get('liverDisease').value) {
        console.log('kidney')
        organsGroup.get('kidney').disable();
        console.log(organsGroup);
      }
      else {
        console.log('No kidney');
        organsGroup.get('kidney').enable();
        console.log(organsGroup);
      }
    }
    checkBoneMarrow() {
      const diseaseGroup = this.getDisease();
      let organsGroup = this.getOrgans();
      if (diseaseGroup.get('hiv').value ||
        diseaseGroup.get('hepatitis').value ||
        diseaseGroup.get('rabies').value ||
        diseaseGroup.get('heartAttack').value ||
        diseaseGroup.get('kidneyDisease').value ||
        diseaseGroup.get('liverDisease').value) {
        console.log('bonemarrow')
        organsGroup.get('boneMarrow').disable();
        console.log(organsGroup);
      } else {
        console.log('No  boneMarrow');
        organsGroup.get('boneMarrow').enable();
        console.log(organsGroup);
      }
    }




  }
