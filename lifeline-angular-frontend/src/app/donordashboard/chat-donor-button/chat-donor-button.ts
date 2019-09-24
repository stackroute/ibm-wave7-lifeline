import { Component, Input, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatDonorBox } from '../chat-donor-box/chat-donor-box';
/**
 * @title Bottom Sheet Overview
 */
@Component({
  selector: 'chat-donor-button',
  templateUrl: 'chat-donor-button.html',
  styleUrls: ['chat-donor-button.css'],
})
export class ChatDonorButton implements AfterViewInit {

  @ViewChild('chat', { static: false }) chat: ElementRef<HTMLElement>;
  private donorId: number;

  private recepientId: number;

  private donorEmail: string;

  private donorName: string;

  constructor(private _bottomSheet: MatBottomSheet, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(data => {
      this.donorId = data.donorId;
      this.recepientId = data.recepientId;
      this.donorEmail =  data.email
      this.donorName = data.donorName;
    })
  }

  ngAfterViewInit() {
    this.chat.nativeElement.click();
  }

  openBottomSheet(): void {
    console.log(this.donorId);
    console.log(this.recepientId);
    this._bottomSheet.open(ChatDonorBox, {
      data: { id: [this.donorId, this.recepientId, this.donorEmail, this.donorName] }
    });
  }
}