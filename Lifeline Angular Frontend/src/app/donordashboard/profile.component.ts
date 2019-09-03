import { Component, OnInit } from '@angular/core';
import { DonorProfileService } from '../service/donor-profile.service';

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public donors;
  
  constructor(private donorProfileService: DonorProfileService) { }

  ngOnInit() {
 this.donorProfileService.getdonerdetails()
    .subscribe(data => {this.donors=data; console.log(this.donors); });
  };
  deletedonor(){
    var succes='false';
  this.donorProfileService.deleteDonor(1).subscribe((data)=>{
     succes = 'true';
      console.log("success");
  });
  }


  
}