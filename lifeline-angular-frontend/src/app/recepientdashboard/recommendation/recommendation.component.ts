import { Component, OnInit } from '@angular/core';
import { RecepientserviceService } from 'src/app/service/recepientservice.service';
import { Recepient } from 'src/app/model/model';
import { Donor } from 'src/app/model/donor';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  public recepients: Recepient;
  public donors;

  constructor(private recepientProfileService: RecepientserviceService) { }

  ngOnInit() {
    this.recepientProfileService.getDonorRecommendationsForRecepient(this.recepients.bloodGroup).subscribe(data => {
      this.donors = data;
    });
  }

}
