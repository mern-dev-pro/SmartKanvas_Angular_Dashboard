import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent implements OnInit {

  @Input() item:any;
  @Input() reverse = false;
  day:string;

  constructor() { }

  ngOnInit(): void {
    const date = Object.keys(this.item)[0];
    this.day = moment(date, 'YYYY-MM-DD hh:mm').format('DD');
  }

}
