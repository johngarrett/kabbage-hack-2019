import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Lunch } from '../../models/lunch.model';
import { LunchService } from '../../services/lunch/lunch.service';
import * as moment from 'moment';

@Component({
  selector: 'todays-lunch',
  templateUrl: './todays-lunch.component.html',
  styleUrls: ['./todays-lunch.component.scss']
})
export class TodaysLunchComponent implements OnInit, OnChanges {

    @Input('date') _lunchDate: moment.Moment;

    constructor(
        private _lunchService: LunchService,
    ) { }

    private _currentLunch: Lunch;

    ngOnInit() {
    }

    ngOnChanges () {
        this._currentLunch = this._lunchService.getLunch(this._lunchDate);
    }

}
