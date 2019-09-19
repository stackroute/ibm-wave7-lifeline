import { Component, OnInit } from '@angular/core';
import { RecepientserviceService } from '../service/recepientservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recepient } from '../model/model';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Donor } from '../model/donor';


@Component({
  selector: 'app-reuest',
  templateUrl: './reuest.component.html',
  styleUrls: ['./reuest.component.css']
})
export class ReuestComponent implements OnInit {
  _snackBar: any;
  private dataSource: Recepient;

  constructor(private route: ActivatedRoute, private recepientProfileService: RecepientserviceService) { }
  public requestOrganForm: FormGroup;
  private recepientId;
  public recepients: Recepient;
  public donors: Array<Donor> = [];

  ngOnInit() {
    console.log(this.donors.length)
    this.route.queryParams.subscribe(params => {
      this.recepientId = params["id"];
      this.requestForm();
    });
  }

  requestForm() {
    this.requestOrganForm = new FormGroup({
      organName: new FormControl({ value: '' }),
      bloodGroup: new FormControl({ value: '' }),
    })
  }

  submit() {
    console.log(this.donors.length);
    let bloodGroup = this.requestOrganForm.get('bloodGroup').value;
    let organName = this.requestOrganForm.get('organName').value;
    this.recepientProfileService.getDonorRecommendationsBasedOnOrganAndBloodForRecepient(bloodGroup, organName).subscribe(data => {
      this.donors = data
    });
  }


}




