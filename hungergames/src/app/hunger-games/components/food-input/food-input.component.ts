import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { flatMap, tap, filter } from 'rxjs/operators';
import * as moment from 'moment';

import { LunchService } from '../../../services/lunch/lunch.service';
import { FoodInput } from '../../../models/food-input.model';

@Component({
  selector: 'food-input',
  templateUrl: './food-input.component.html',
  styleUrls: ['./food-input.component.scss']
})
export class FoodInputComponent implements OnInit {

    constructor(private _lunchService: LunchService) { }

    private foodInputForm = new FormGroup({
        ordered: new FormControl(''),
        leftOver: new FormControl(''),
        mainCourse: new FormControl('')
    });

    private _recentFoodInputs: Array<FoodInput>;

    ngOnInit() {
        timer(0, 10000).pipe(
            flatMap(_ => this._lunchService.getRecentFoodInputs()),
            tap(inputs => this._recentFoodInputs = inputs)
        ).subscribe();
    }

    submit() {
        let formValue = this.foodInputForm.value;
        formValue.timestamp = moment();
        this._lunchService.postFoodInput(formValue).pipe(
            filter(ok => ok),
            tap(_ => this._recentFoodInputs.push(formValue)),
            tap(_ => this._recentFoodInputs.sort((a, b) => {
                let ma = moment(a.timestamp);
                let mb = moment(b.timestamp);
                // sort newest first
                return +mb - +ma;
            }))
        ).subscribe();
    }

    reset() {
        this.foodInputForm.reset();
    }

}
