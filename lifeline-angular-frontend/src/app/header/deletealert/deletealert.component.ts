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
  constructor(private route: ActivatedRoute,private receipientservice:RecepientserviceService,private donorservice:DonorProfileService, public dialogRef: MatDialogRef<DeletealertComponent>) { }

  ngOnInit() {
  }
 
delete() {
  var succes = 'false';
  this.route.queryParams.subscribe(params => {
    let id = params["id"];
    if(params["usertype"]=='donor')
    {
    this.donorId = id;
  this.donorservice.deleteDonor(this.donorId).subscribe((data) => {
    succes = 'true';
    console.log("success");
  });
}
else{
  this.receipientservice.deleteReceiver(id).subscribe((data) => {
    succes = 'true';
    console.log("success");
  });
}
  // this.donorservice.getDonorById(this.donorId).subscribe((data) => {
  //   this.donor = data;
  //   console.log(this.donor);
  // });
})
}
close()
{
  this.dialogRef.close();
}
}

