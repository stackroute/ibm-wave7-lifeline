import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import 'jquery';
import { RecepientserviceService } from 'src/app/service/recepientservice.service';

@Component({
  selector: 'chat-donor-box',
  templateUrl: 'chat-donor-box.html',
  styleUrls: ['chat-donor-box.css'],
})
export class ChatDonorBox {

  private serverUrl = 'http://52.66.129.41:8084/websocket';

  private donorId: any;

  private recepientId: any;

  private email: string;

  private donorName: string;

  private stompClient;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef, private recepientService: RecepientserviceService) {
    this.donorId = data.id[0];
    this.recepientId = data.id[1];
    this.email = data.id[2];
    this.donorName = data.id[3];
    this.initializeWebSocketConnection();
  }


  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    let name = this.donorName;
    let chatUrl = "/chat/" + this.recepientId + "/" + this.donorId;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe(chatUrl, (message) => {
        console.log("MESSAGE " + message);
        if (message.body) {
          $(".chat").append("<div class='message'><h5>" + message.body + "</h5></div>")
          console.log("message body" + message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send("/app/send/message/donor" + "/" + this.recepientId + "/" + this.donorId + "/" + this.donorName, {}, message);
    $('#input').val('');
  }
}
