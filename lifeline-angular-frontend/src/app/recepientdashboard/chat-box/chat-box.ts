import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import 'jquery';
import { RecepientserviceService } from 'src/app/service/recepientservice.service';
import { DonorProfileService } from 'src/app/service/donor-profile.service';

@Component({
  selector: 'chat-box',
  templateUrl: 'chat-box.html',
  styleUrls: ['chat-box.css'],
})
export class ChatBox {

  private serverUrl = 'http://52.66.129.41:8084/websocket';

  private donorId: any;

  private recepientId: any;

  private donorEmail : string;

  private donorName : string;

  private receiverName: string;

  private stompClient;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef, 
  private recepientService: RecepientserviceService, private donorService: DonorProfileService) {
    this.donorId = data.id[0];
    this.recepientId = data.id[1];
    this.donorEmail = data.id[2];
    this.donorName = data.id[3];
    this.receiverName = data.id[4];
    console.log(data);
    this.initializeWebSocketConnection();
  }


  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    let chatUrl = "/chat/" + this.recepientId + "/" + this.donorId;
    let send = this.sendMail();
    let name = this.receiverName;
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
    this.recepientService.sendMailForChat(this.recepientId, this.donorId, this.donorEmail, this.donorName).subscribe();
  }

  sendMessage(message) {
    this.stompClient.send("/app/send/message/recepient" + "/" + this.recepientId + "/" + this.donorId + "/" + this.receiverName, {}, message, "Recepient");
    $('#input').val('');
    this.sendMail();
  }
}
