import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Log } from '../models/Log';
import { getLocaleWeekEndRange } from '@angular/common';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  logs: Log[];
  logText: string;

  constructor(public firebaseservice: FirebaseService) {}

  ngOnInit(): void {
    this.getLogItems();
  }

  getLogItems() {
    this.firebaseservice.getAllLogs().subscribe((data: any) => {
      
      this.logs = data.map( e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data().name,
          date: e.payload.doc.data().date.toDate()
        }
      });

      // Sort by date - newest to oldest.
      this.logs.sort(function(a, b) {
        if ( a.date < b.date ) {
          return 1;
        } else {
          return -1;
        }
      });
    });
  }

  addLogItem(e) {
    if (!this.logText) {
      alert('Please enter some text.');
    } else if (this.logText.length > 120) {
      alert('Must be 120 characters or less.')
    } else {
      this.firebaseservice.addLog({
        name: this.logText,
        date: new Date()
      });
      this.logText = '';
    }
    e.preventDefault();
  }

}