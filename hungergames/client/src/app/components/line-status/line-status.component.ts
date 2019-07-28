import { Component, OnInit } from '@angular/core';
import { LineStatus } from '../../models/line-status.model';
import { LunchService } from '../../services/lunch/lunch.service';

@Component({
  selector: 'line-status',
  templateUrl: './line-status.component.html',
  styleUrls: ['./line-status.component.scss']
})
export class LineStatusComponent implements OnInit {

    constructor(private _lunchService: LunchService) { }

    private _lineStatus: LineStatus;

    ngOnInit() {
        this._lineStatus = this._lunchService.getLineStatus();
    }

}
