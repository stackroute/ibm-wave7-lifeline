import { Component, OnInit } from '@angular/core';
import { RecepientserviceService } from '../service/recepientservice.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Recepient } from '../model/model';
import { ActivatedRoute } from '@angular/router';
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
  public recepientId: number;
  public recepientName: string;
  public recepients: Recepient;
  public donors: Array<Donor> = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recepientId = params["id"];
      this.recepientProfileService.getRecepientById(this.recepientId).subscribe(data => {
        this.recepientName = data.firstName;
        console.log(this.recepientName);
      })
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
    let bloodGroup = this.requestOrganForm.get('bloodGroup').value;
    let organName = this.requestOrganForm.get('organName').value;
    console.log(bloodGroup);
    console.log(organName)
    this.recepientProfileService.getDonorRecommendationsBasedOnOrganAndBloodForRecepient(bloodGroup, organName).subscribe(data => {
      console.log(data)
      this.donors = data
    });
  }


}




