import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.scss']
})
export class TimelineCardComponent implements OnInit {

  @Input() item:any;
  @Input() sideClass = 'left';
  log:any;
  time:string;
  constructor() { }

  ngOnInit(): void {
    this.time = this.getTime()
    this.log = this.getLog()
  }

  getLog(){
    const key = Object.keys(this.item)[0]
    return this.item[key];
  }

  getTime(){
    const date = Object.keys(this.item)[0];
    return moment(date, 'YYYY-MM-DD HH:mm').format('HH:mm');
  }
}
