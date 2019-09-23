import { Component, Input, Inject } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ChatDonorBox } from '../../donordashboard/chat-donor-box/chat-donor-box';
import { Route } from '@angular/compiler/src/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { ChatBox } from '../chat-box/chat-box';
import { DonorProfileService } from 'src/app/service/donor-profile.service';
/**
 * @title Bottom Sheet Overview
 */
@Component({
  selector: 'chat-button',
  templateUrl: 'chat-button.html',
  styleUrls: ['chat-button.css'],
})
export class ChatButton {

  @Input() private donorId: number;

  @Input() private recepientId: number;

  private donorEmail: string;

  constructor(private _bottomSheet: MatBottomSheet, private router: Router, private donorService: DonorProfileService) {
  }

  openBottomSheet(): void {
    console.log(this.donorId);
    console.log(this.recepientId);
    this.donorService.getDonorById(this.donorId).subscribe(data => {
      console.log(data)
      this.donorEmail = data.email;
      this._bottomSheet.open(ChatBox, {
        data: { id: [this.donorId, this.recepientId, this.donorEmail] }
      });
    });
  }
}