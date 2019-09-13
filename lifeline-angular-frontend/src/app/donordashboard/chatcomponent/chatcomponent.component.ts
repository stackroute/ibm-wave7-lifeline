import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
// import $ from 'jquery';
@Component({
  selector: 'app-chatcomponent',
  templateUrl: './chatcomponent.component.html',
  styleUrls: ['./chatcomponent.component.css']
})
export class ChatcomponentComponent  {
  private serverUrl = 'http://172.23.238.240:8080/websocket'
 
  private stompClient;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ChatcomponentComponent>) { 
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          // $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    // $('#input').val('');
  }
}
