import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pixelFront';

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
    )
  }
}
