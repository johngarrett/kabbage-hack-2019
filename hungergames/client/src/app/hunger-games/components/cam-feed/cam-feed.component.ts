import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'cam-feed',
  templateUrl: './cam-feed.component.html',
  styleUrls: ['./cam-feed.component.scss']
})
export class CamFeedComponent implements OnInit {

    constructor() { }

    private _lastRefresh: moment.Moment;

    ngOnInit() {
        this._lastRefresh = moment();
    }

    refresh() {
        let iframe = <HTMLIFrameElement> document.getElementById('cam-feed-iframe');
        iframe.contentWindow.location.reload(true);
        this._lastRefresh = moment();
    }

}
