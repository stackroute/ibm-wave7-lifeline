import { Component, OnInit } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { ChatcomponentComponent } from '../chatcomponent/chatcomponent.component';
@Component({
  selector: 'app-chatbutton',
  templateUrl: './chatbutton.component.html',
  styleUrls: ['./chatbutton.component.css']
})
export class ChatbuttonComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }
  openBottomSheet(): void {
    this._bottomSheet.open(ChatcomponentComponent);
  }
}
