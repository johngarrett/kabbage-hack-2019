import { Component, OnInit } from '@angular/core';
import { timer, of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { LineStatus } from '../../../models/line-status.model';
import { LunchService } from '../../../services/lunch/lunch.service';

@Component({
  selector: 'line-status',
  templateUrl: './line-status.component.html',
  styleUrls: ['./line-status.component.scss']
})
export class LineStatusComponent implements OnInit {

    constructor(private _lunchService: LunchService) { }

    _lineStatus: LineStatus;

    ngOnInit() {
        this._lineStatus = {
            lineOpen: false,
            lineLength: 0,
            linePace: 0
        };

        timer(0, 10000).pipe(
            flatMap(_ => this._lunchService.getLineStatus()),
            flatMap(line => of({
                lineOpen: line.lineOpen,
                lineLength: line.lineLength || 0,
                linePace: line.linePace || 0,
            })),
            tap(line => this._lineStatus = line)
        ).subscribe();
    }

}
