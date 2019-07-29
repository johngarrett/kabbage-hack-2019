import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HungerGamesComponent } from './hunger-games/hunger-games.component';


const routes: Routes = [
    { path: '', component: HungerGamesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
