import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowMeLunchComponent } from './components/show-me-lunch/show-me-lunch.component';
import { LineStatusComponent } from './components/line-status/line-status.component';
import { CamFeedComponent } from './components/cam-feed/cam-feed.component';
import { LunchService } from '../services/lunch/lunch.service';
import { HungerGamesComponent } from './hunger-games.component';

@NgModule({
  declarations: [
    ShowMeLunchComponent,
    LineStatusComponent,
    CamFeedComponent,
    HungerGamesComponent,
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [HungerGamesComponent]
})
export class HungerGamesModule { }
