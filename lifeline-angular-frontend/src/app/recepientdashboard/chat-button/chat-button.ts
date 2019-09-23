import {Component, Input, Inject} from '@angular/core';
import {MatBottomSheet, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {ChatBox} from '../chat-box/chat-box';
import { Route } from '@angular/compiler/src/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
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

  constructor(private _bottomSheet: MatBottomSheet, private router: Router) {
  }

  openBottomSheet(): void {
    console.log(this.donorId);
    console.log(this.recepientId);
    this._bottomSheet.open(ChatBox, {
      data: {id: [this.donorId, this.recepientId]}
    });
  }
}