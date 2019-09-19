import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  yt_iframe_html: any;
  iframe_html:any;
  iframehtml:any;
  youtubeUrl = "https://www.youtube.com/watch?v=k6xgSB6A9Eg";
  youtube_Url="https://www.youtube.com/watch?v=7Rf15DV5Ok0";
  youtube_url="https://www.youtube.com/watch?v=YFT31LlJhwU"
  constructor(private embedService: EmbedVideoService) {
   
   }

  ngOnInit() {
    this.yt_iframe_html = this.embedService.embed(this.youtubeUrl);
    this.iframe_html=this.embedService.embed(this.youtube_Url);
    this.iframehtml=this.embedService.embed(this.youtube_url);
  }

}
