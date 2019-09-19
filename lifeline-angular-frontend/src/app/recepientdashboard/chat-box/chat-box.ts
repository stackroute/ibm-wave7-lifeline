import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import 'jquery';

@Component({
  selector: 'chat-box',
  templateUrl: 'chat-box.html',
  styleUrls: ['chat-box.css'],
})
export class ChatBox {

  private serverUrl = 'http://52.66.129.41:8084/websocket';

  private donorId: string;

  private recepientId: string;

  private stompClient;


  constructor(private _bottomSheetRef: MatBottomSheetRef<ChatBox>) {
    this.initializeWebSocketConnection();
  }


  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/chat" + "/" + this.donorId + "/" + this.recepientId, (message) => {
        console.log("MESSAGE " + message);
        if (message.body) {
          $(".chat").append("<div class='message'><h3>" + message.body + "</h3></div>")
          console.log("message body" + message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send("/app/send/message" + "/" + this.donorId + "/" + this.recepientId, {}, message);
    $('#input').val('');
  }
}
