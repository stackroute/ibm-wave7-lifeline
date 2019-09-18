import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import{DonorProfileService} from '../../service/donor-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Donor } from '../../model/donor';

@Component({
  selector: 'app-deletealert',
  templateUrl: './deletealert.component.html',
  styleUrls: ['./deletealert.component.css']
})
export class DeletealertComponent implements OnInit {
donorId:number;
public donor;
  constructor(private route: ActivatedRoute,private donorservice:DonorProfileService, public dialogRef: MatDialogRef<DeletealertComponent>) { }

  ngOnInit() {
  }
 
delete() {
  var succes = 'false';
  this.route.queryParams.subscribe(params => {
     this.donorId  = params["id"];
   
  this.donorservice.deleteDonor(this.donorId).subscribe((data) => {
    let deletedDonor = data;
    succes = 'true';
    console.log("success");
  });
  // this.donorservice.getDonorById(this.donorId).subscribe((data) => {
  //   this.donor = data;
  //   console.log(this.donor);
  // });
  this.dialogRef.close();
  location.reload();
})

}
close()
{
  this.dialogRef.close();
}
}

