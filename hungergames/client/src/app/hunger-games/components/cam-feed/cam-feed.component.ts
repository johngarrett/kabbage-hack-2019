import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as moment from 'moment';

@Component({
  selector: 'cam-feed',
  templateUrl: './cam-feed.component.html',
  styleUrls: ['./cam-feed.component.scss']
})
export class CamFeedComponent implements OnInit {

    constructor() { }

    private camFeed =  "https://nexusapi-us1.camera.home.nest.com/get_image?uuid=f2a6b836da604bae9ca428635c173814&width=540&public=6F7uwYxcUX";

    private _lastRefresh: moment.Moment;
    private _imageSrc: string;

    ngOnInit() {
        this._lastRefresh = moment();
        this._imageSrc = this.camFeed;

        interval(30000).pipe(
            tap(() => this.refresh())
        ).subscribe();
    }

    refresh() {
        this._lastRefresh = moment();
        this._imageSrc = this.camFeed + "&" + +this._lastRefresh;
    }

}
