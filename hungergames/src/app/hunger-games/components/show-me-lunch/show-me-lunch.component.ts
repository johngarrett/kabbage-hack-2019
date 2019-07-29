import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { Lunch } from '../../../models/lunch.model';
import { LunchService } from '../../../services/lunch/lunch.service';


@Component({
  selector: 'show-me-lunch',
  templateUrl: './show-me-lunch.component.html',
  styleUrls: ['./show-me-lunch.component.scss']
})
export class ShowMeLunchComponent implements OnInit {

    constructor(
        private _lunchService: LunchService,
    ) { }

    private formatString = 'ddd MM-DD-YYYY'

    _currentLunch: Lunch;
    _currentDate: moment.Moment;

    ngOnInit() {
        this._currentDate = moment();
        this._currentLunch = {
            date: moment().format(this.formatString),
            menu: ""
        }

        this.changeDay(0);
    }

    changeDay(days: number) {
        this._currentDate = moment(this._currentDate).add(days, 'days');

        this._lunchService.getLunch(this._currentDate).pipe(
            tap(lunch => {
                lunch.date = moment(lunch.date).format(this.formatString)
                this._currentLunch = lunch;
            })
        ).subscribe();

    }
}
