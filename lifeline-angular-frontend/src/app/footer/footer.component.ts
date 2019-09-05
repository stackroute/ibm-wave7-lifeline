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
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/iconmonstr-twitter-1.svg')
        );
        iconRegistry.addSvgIcon(
          'instagram',
          sanitizer.bypassSecurityTrustResourceUrl('assets/images/iconmonstr-instagram-12.svg')
          );
          iconRegistry.addSvgIcon(
            'copyright',
            sanitizer.bypassSecurityTrustResourceUrl('assets/images/copyright-symbol.svg')
            );
  }
 

  ngOnInit() {
  }

}
