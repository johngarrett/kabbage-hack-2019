import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowMeLunchComponent } from './components/show-me-lunch/show-me-lunch.component';
import { HeaderComponent } from './components/header/header.component';
import { LineStatusComponent } from './components/line-status/line-status.component';
import { CamFeedComponent } from './components/cam-feed/cam-feed.component';
import { LunchService } from './services/lunch/lunch.service';
import { TodaysLunchComponent } from './components/todays-lunch/todays-lunch.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowMeLunchComponent,
    HeaderComponent,
    LineStatusComponent,
    CamFeedComponent,
    TodaysLunchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
