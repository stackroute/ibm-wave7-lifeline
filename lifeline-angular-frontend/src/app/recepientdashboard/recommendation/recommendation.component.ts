import { Component, OnInit } from '@angular/core';
import { RecepientserviceService } from 'src/app/service/recepientservice.service';
import { Recepient } from 'src/app/model/model';
import { ActivatedRoute } from '@angular/router';
import { Donor } from 'src/app/model/donor';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  public recepients: Recepient = null;
  public donors;
  private recepientId;

  constructor(private recepientProfileService: RecepientserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recepientId = params["id"];
      console.log(this.recepientId);
      this.recepientProfileService.getRecepientById(this.recepientId).subscribe(data => {
        this.recepients = data;
        console.log(this.recepients);
        this.recepientProfileService.getDonorRecommendationsForRecepient(this.recepients.bloodGroup).subscribe(data => {
          console.log(data)
          this.donors = data;
        });
      });
    });
  }

}
