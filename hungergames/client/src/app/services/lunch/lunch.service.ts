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
            catchError((err): Observable<any> => of({
                date: date,
                menu: "Not found"
            }))
        );
    }

    getLineStatus(): Observable<LineStatus> {
        return this._http.get('/api/lineStatus/').pipe(
            catchError((err): Observable<any> => of({
                lineOpen: false,
                lineLength: 0,
                linePace: 0
            }))
        );
    }
}
