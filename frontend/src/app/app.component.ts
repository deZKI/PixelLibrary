import {Component} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.supplementMatIconRegistry();
  }

  private supplementMatIconRegistry() {
    this.matIconRegistry.addSvgIcon(
      `pixel-logo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/pixel-logo.svg")
    ).addSvgIcon(
      `search-loupe`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/search-loupe.svg")
    ).addSvgIcon(
      `basket`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/basket.svg")
    ).addSvgIcon(
      `bookmark`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/bookmark.svg")
    ).addSvgIcon(
      `favorite`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/favorite.svg")
    ).addSvgIcon(
      `profile`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/profile.svg")
    ).addSvgIcon(
      `pixel-logo-white`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/pixel-logo-white.svg")
    )
  }
}
