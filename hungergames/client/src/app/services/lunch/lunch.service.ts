import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { LineStatus } from '../../models/line-status.model';
import { Lunch } from '../../models/lunch.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LunchService {

    constructor(private _http: HttpClient) { }

    getLunch(date: moment.Moment) : Observable<Lunch> {
        let targetDate = date.format('YYYY-MM-DD');
        return this._http.get('/api/lunches/' + targetDate).pipe(
            tap(() => console.log("requesting")),
            catchError((err): Observable<any> => {
                console.log(err);
                return of({
                    date: targetDate,
                    menu: "Not found"
                })
            })
        );
    }

    getLineStatus(): LineStatus {
        return {
            opened: false,
            lineLength: 15,
            waitTime: 11,
        }
    }
}
