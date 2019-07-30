import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { FoodInput } from '../../models/food-input.model';
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
        return this._http.get('http://ec2-18-212-187-168.compute-1.amazonaws.com/lunches/' + targetDate).pipe(
            catchError((err): Observable<any> => of({
                date: date,
                menu: "Not found"
            }))
        );
    }

    getLineStatus(): Observable<LineStatus> {
        return this._http.get('http://ec2-18-212-187-168.compute-1.amazonaws.com/line/stats').pipe(
            catchError((err): Observable<any> => of({
                lineOpen: false,
                lineLength: 0,
                linePace: 0
            }))
        );
    }

    getRecentFoodInputs(): Observable<Array<FoodInput>> {
        console.log("getting recent inputs");
        return of([]);
    }

    postFoodInput(input: FoodInput): Observable<boolean> {
        console.log("posting food input", input);
        return of(true);
    }
}
