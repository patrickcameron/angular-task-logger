import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

import { Log } from '../models/Log';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: [`./log-item.component.scss`]
})
export class LogItemComponent implements OnInit {
  
  @Input() log: Log;
  isEditMode: boolean = false;

  constructor(public firebaseservice: FirebaseService) { }

  ngOnInit(): void {
  }

  editLogItem(log: Log) {
    this.firebaseservice.editLog(log);
    this.isEditMode = false;
  }

  deleteLogItem(logId: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.firebaseservice.deleteLog(logId);
    }
  }

}
