import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AuthInterceptor} from "./auth.interceptor";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./services/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
