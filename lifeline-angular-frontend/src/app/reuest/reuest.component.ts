import { Component, OnInit } from '@angular/core';
import { RecepientserviceService } from '../service/recepientservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recepient } from '../model/model';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


@Component({
  selector: 'app-reuest',
  templateUrl: './reuest.component.html',
  styleUrls: ['./reuest.component.css']
})
export class ReuestComponent implements OnInit {
  _snackBar: any;
  private dataSource: Recepient;

  constructor(private route:ActivatedRoute,private recepientProfileService:RecepientserviceService) { }
  public requestOrganForm: FormGroup;
  private recepientId;
  public recepients:Recepient;
  
  durationInSeconds = 5;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recepientId = params["id"];
      console.log(this.recepientId);
      this.requestForm();
      this.recepientProfileService.getRecepientById(this.recepientId).subscribe(data => {
        this.recepients = data;
        this.dataSource = data;
        console.log(this.recepients);
      });
    });
  }
    requestForm() {
      this.requestOrganForm = new FormGroup({
       
        organName: new FormControl({value: ''}, [Validators.required,Validators.maxLength(40)]),
       
        bloodGroup:new FormControl({value: '', disabled: true}, Validators.required),
      })
    }
    newRequest()
 {
  // console.log(this.requestOrganForm.get('organName').value);
  // console.log(this.requestOrganForm.get('bloodGroup').value);
  
  this.recepients.organName= this.requestOrganForm.get('organName').value;
  this.recepients.bloodGroup=this.requestOrganForm.get('bloodGroup').value;
 
  this.recepientProfileService.updateRecepient(this.recepients, this.recepientId).subscribe();
  this._snackBar.openFromComponent(SnackBarComponent, {
    duration: this.durationInSeconds * 1000,
  });
}
}
  



