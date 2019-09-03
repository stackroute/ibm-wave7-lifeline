import { Component, OnInit } from '@angular/core';
import { RecepientserviceService } from '../service/recepientservice.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recepientdashboard',
  templateUrl: './recepientdashboard.component.html',
  styleUrls: ['./recepientdashboard.component.css']
})
export class RecepientdashboardComponent implements OnInit {

  public profileForm: FormGroup;
  private recepientId;
  public recepients:Recepient;
  constructor(private route:ActivatedRoute,private router:Router,private recepientProfileService:RecepientserviceService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get("id"));
      this.recepientId = id;
    });
  }

  ngOnInit() {
    this.createForm();
    this.recepientProfileService.getrecepientdetails()
    .subscribe(data => {
      this.recepients=data; 
      this.profileForm.controls['phoneNumber'].setValue(this.recepients.phoneNumber);
      this.profileForm.controls['addressLine1'].setValue(this.recepients.address.addressLine1);
      this.profileForm.controls['addressLine2'].setValue(this.recepients.address.addressLine2);
      this.profileForm.controls['city'].setValue(this.recepients.address.city);
      this.profileForm.controls['state'].setValue(this.recepients.address.state);
      this.profileForm.controls['pinCode'].setValue(this.recepients.address.pinCode);
    });
    console.log(this.recepients);
    this.recepientProfileService.getRecepientById(this.recepientId).subscribe((data) => {
      this.recepients = data;
      console.log(this.recepients)
    });
    this.recepientProfileService.getRecepientPastHistoryById(this.id).subscribe((data) => {
      this.recepients = data;
      console.log(this.recepients);
    });
  };
  createForm() {
    this.profileForm = new FormGroup({
      phoneNumber: new FormControl(),
      addressLine1: new FormControl(),
      addressLine2: new FormControl(),
      city:new FormControl(),
      state:new FormControl(),
      pinCode:new FormControl()
    });
  }
 
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;;
  }

  updateRecepient(recepients)
 {
   console.log(this.profileForm.get('phoneNumber').value);
   this.recepients.phoneNumber = this.profileForm.get('phoneNumber').value;
   this.recepients.address.addressLine1 = this.profileForm.get('addressLine1').value;
   this.recepients.address.addressLine2 = this.profileForm.get('addressLine2').value;
   this.recepients.address.city = this.profileForm.get('city').value;
   this.recepients.address.state = this.profileForm.get('state').value;
   this.recepients.address.pinCode = this.profileForm.get('pinCode').value;
   console.log(recepients);
   this.recepientProfileService.updateRecepient(recepients).subscribe();
 }

}

 

 
