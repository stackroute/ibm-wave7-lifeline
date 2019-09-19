import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook.svg')
    );
    iconRegistry.addSvgIcon(
      'twittor',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/twitter.svg')
    );
    iconRegistry.addSvgIcon(
      'instagram',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/instagram.svg')
    );
    iconRegistry.addSvgIcon(
      'copyright',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/copyright-symbol.svg')
    );
    iconRegistry.addSvgIcon(
      'location',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/location.svg')
    );
    iconRegistry.addSvgIcon(
      'mail',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/mail.svg')
    );
    iconRegistry.addSvgIcon(
      'call',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/call.svg')
    );
  }


  ngOnInit() {
  }

}
