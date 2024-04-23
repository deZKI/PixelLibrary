import {Component} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.supplementMatIconRegistry();
  }

  public supplementMatIconRegistry() {
    this.matIconRegistry.addSvgIcon(
      `pixel-icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/pixel-logo.svg")
    ).addSvgIcon(
      `search-loupe`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/search-loupe.svg")
    )
  }
}
