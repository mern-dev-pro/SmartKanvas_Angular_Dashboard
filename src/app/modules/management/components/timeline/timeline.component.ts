import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  canvasTimeline:any[];
  monthsLogs:any[];

  constructor(
    private router:Router,
    private dialogRef: MatDialogRef<TimelineComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.canvasTimeline = this.transTimelineformObjIntoArray(this.data.canvasTimeline);
    this.monthsLogs = this.getMonthsLogs();
  }

  transTimelineformObjIntoArray(canvasTimeline){
    const timelineArray = [];
    const keys = Object.keys(canvasTimeline);

    for(let key of keys ){

      timelineArray.push({
        [key]: canvasTimeline[key]
      })
    }

    return timelineArray
  }
  getMonthsLogs(){
    const months = this.getMonths();
    const monthsLogs = [];
    let monthLogs;

    for(let month of months) {
      monthLogs = this.canvasTimeline.filter(log => this.formatMonth(Object.keys(log)[0]) === month);
      const monthYear = month.split(' ');
      monthLogs = this.sortMonthLogs(monthLogs);
      monthsLogs.push({
        month: monthYear[0],
        year: monthYear[1],
        logs: monthLogs
      })
    }

    return monthsLogs.reverse();
  }

  sortMonthLogs(logs){
    const sortedLogs = logs.sort((a,b) => {
      if(Object.keys(a)[0] > Object.keys(b)[0]){
        return 1
      }

      if(Object.keys(a)[0] < Object.keys(b)[0]){
        return -1
      }

      return 0;
    })

    return sortedLogs
  }
  getMonths(){
    const months = [];
    let month;

    for(let timelineItem of this.canvasTimeline){
      const dateTimeline =  Object.keys(timelineItem)[0];
      month = this.formatMonth(dateTimeline);
      if(!months.includes(month)){
        months.push(month)
      }
    }

    return months;

  }

  formatMonth(date){
    return moment(date,'YYYY-MM-DD').format('MMM YYYY');
  }
  backToList(){
    this.dialogRef.close();
  }

}
