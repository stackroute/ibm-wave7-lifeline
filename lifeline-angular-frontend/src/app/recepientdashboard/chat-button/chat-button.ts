import {Component} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ChatBox} from '../chat-box/chat-box';
/**
 * @title Bottom Sheet Overview
 */
@Component({
  selector: 'chat-button',
  templateUrl: 'chat-button.html',
  styleUrls: ['chat-button.css'],
})
export class ChatButton {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(ChatBox);
  }
}