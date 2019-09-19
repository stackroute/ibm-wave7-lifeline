import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import{DonorProfileService} from '../../service/donor-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Donor } from '../../model/donor'
import{RecepientserviceService}from'../../service/recepientservice.service';

@Component({
  selector: 'app-deletealert',
  templateUrl: './deletealert.component.html',
  styleUrls: ['./deletealert.component.css']
})
export class DeletealertComponent implements OnInit {
donorId:number;
public donor: Donor;
  constructor(private route: ActivatedRoute,private recepientProfileService:RecepientserviceService,private donorProfileService:DonorProfileService, public dialogRef: MatDialogRef<DeletealertComponent>) { }

  ngOnInit() {
  }
  delete() {
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      console.log(params)
      this.route.children[0].url.subscribe(data => {
        console.log(data[0].path);
        if (data[0].path == 'donor') {
          this.donorProfileService.deleteDonor(id).subscribe(data => {
            console.log(data);
          });
        }
        else {
          this.recepientProfileService.deleteRecepient(id).subscribe(data => {
            console.log(data);
          });
        }
      });
    });
    this.dialogRef.close();
    window.location.href="";
  }
  close() {
    this.dialogRef.close();
  }
 }

