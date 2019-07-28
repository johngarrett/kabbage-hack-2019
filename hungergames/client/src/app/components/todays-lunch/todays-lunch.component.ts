import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { tap } from 'rxjs/operators';

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
        this._currentLunch = {
            date: moment().format("YYYY-MM-DD"),
            menu: ""
        }
    }

    ngOnChanges () {
        this._lunchService.getLunch(this._lunchDate).pipe(
            tap(lunch => this._currentLunch = lunch)
        ).subscribe((lunch: Lunch) => {
            console.log(lunch);
        });
    }

}
