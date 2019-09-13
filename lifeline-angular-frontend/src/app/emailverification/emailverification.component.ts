import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecepientserviceService } from '../service/recepientservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recepient } from '../model/model';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {


  public recepient: Recepient;
  constructor(private route: ActivatedRoute, private router: Router, private recepientProfileService: RecepientserviceService) { }

  ngOnInit() {
    this.verifyRecepient();
  }

  verifyRecepient() {
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      this.recepientProfileService.getRecepientById(id).subscribe(data => {
        this.recepient = data;
        console.log(this.recepient)
        this.recepient.isEmailVerified = "true";
        this.recepientProfileService.updateRecepient(this.recepient, id).subscribe(data => {
        console.log(data);
      });
      });
    });
  }
}