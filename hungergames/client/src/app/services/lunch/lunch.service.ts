import { Injectable } from '@angular/core';
import { LineStatus } from '../../models/line-status.model';
import { Lunch } from '../../models/lunch.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LunchService {

    constructor() { }

    getLunch(date: string) : Lunch {
        let targetDate = moment(date).format('YYYY-MM-DD');
        return {
          date: moment(date).format('ddd MM/DD/YYYY'),
          lunch: "yes"
        };
    }

    getLineStatus(): LineStatus {
        return {
            opened: false,
            lineLength: 15,
            waitTime: 11,
        }
    }
}
