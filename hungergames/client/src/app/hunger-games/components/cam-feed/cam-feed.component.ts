import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'cam-feed',
  templateUrl: './cam-feed.component.html',
  styleUrls: ['./cam-feed.component.scss']
})
export class CamFeedComponent implements OnInit {

    constructor() { }

    private camFeed =  "https://nexusapi-us1.camera.home.nest.com/get_image?uuid=2c75a4adf261417a9671ab08c793a2ee&width=540&public=IQLuLbewPe";

    private _lastRefresh: moment.Moment;
    private _imageSrc: string;

    ngOnInit() {
        this._lastRefresh = moment();
        this._imageSrc = this.camFeed;
    }

    refresh() {
        this._imageSrc = this.camFeed + "&" + +moment();
    }

}
