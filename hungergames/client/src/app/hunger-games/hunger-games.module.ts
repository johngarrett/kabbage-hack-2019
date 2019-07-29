import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ShowMeLunchComponent } from './components/show-me-lunch/show-me-lunch.component';
import { LineStatusComponent } from './components/line-status/line-status.component';
import { CamFeedComponent } from './components/cam-feed/cam-feed.component';
import { LunchService } from '../services/lunch/lunch.service';
import { FoodInputComponent } from './components/food-input/food-input.component';
import { LoginComponent } from '../components/login/login.component';
import { HungerGamesComponent } from './hunger-games.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: HungerGamesComponent
    },
    {
        path: 'admin',
        component: FoodInputComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
  declarations: [
    ShowMeLunchComponent,
    LineStatusComponent,
    CamFeedComponent,
    FoodInputComponent,
    HungerGamesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  bootstrap: [HungerGamesComponent],
})
export class HungerGamesModule { }
