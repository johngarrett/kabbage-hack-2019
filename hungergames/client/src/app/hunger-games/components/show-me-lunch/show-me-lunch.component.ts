import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'show-me-lunch',
  templateUrl: './show-me-lunch.component.html',
  styleUrls: ['./show-me-lunch.component.scss']
})
export class ShowMeLunchComponent implements OnInit {

    constructor( ) { }

    private _currentDate: moment.Moment;

    ngOnInit() {
        this._currentDate = moment();
    }

    prevDay() {
        this._currentDate = moment(this._currentDate).subtract(1, 'days');
    }

    nextDay() {
        this._currentDate = moment(this._currentDate).add(1, 'days');
    }

}
