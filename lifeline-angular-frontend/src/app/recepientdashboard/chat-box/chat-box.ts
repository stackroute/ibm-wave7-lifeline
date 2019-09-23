import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import 'jquery';
import { RecepientserviceService } from 'src/app/service/recepientservice.service';

@Component({
  selector: 'chat-box',
  templateUrl: 'chat-box.html',
  styleUrls: ['chat-box.css'],
})
export class ChatBox {

  private serverUrl = 'http://172.23.238.228:8084/websocket';

  private donorId: string;

  private recepientId: string;

  private stompClient;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef, private recepientService: RecepientserviceService) {
    this.donorId = data.id[0];
    this.recepientId = data.id[1];
    this.initializeWebSocketConnection();
  }


  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    let chatUrl = "/chat/" + this.recepientId + "/" + this.donorId;
    let send = this.sendMail();
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

  sendMail() {
    this.recepientService.sendMailForChat(this.recepientId, this.donorId, "siri@mailinator.com").subscribe();
  }

  sendMessage(message) {
    this.stompClient.send("/app/send/message" + "/" + this.recepientId + "/" + this.donorId, {}, message);
    $('#input').val('');
    this.sendMail();
  }
}
