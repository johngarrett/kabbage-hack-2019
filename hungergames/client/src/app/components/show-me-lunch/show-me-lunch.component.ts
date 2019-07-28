import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Lunch } from '../../models/lunch.model';
import { LunchService } from '../../services/lunch/lunch.service';

@Component({
  selector: 'show-me-lunch',
  templateUrl: './show-me-lunch.component.html',
  styleUrls: ['./show-me-lunch.component.scss']
})
export class ShowMeLunchComponent implements OnInit {

    @Input('date') _lunchDate: string;

    constructor(
        private _lunchService: LunchService,
        private _router: Router
    ) { }

    private _currentLunch: Lunch;

    ngOnInit() {
        this._currentLunch = this._lunchService.getLunch(this._lunchDate);
    }

}
