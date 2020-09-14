import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Log } from '../models/Log';

@Injectable({
    providedIn: 'root'
})

export class FirebaseService {
    
    constructor(public fireservices:AngularFirestore) {}

    getAllLogs() {
        return this.fireservices.collection('logs').snapshotChanges();
    }

    addLog(log: Log) {
        this.fireservices.collection('logs').add(log);
    }

    editLog(log: Log) {
        this.fireservices.doc(`logs/${log.id}`).update({
            name: log.name
        })
    }

    deleteLog(logId) {
        this.fireservices.doc(`logs/${logId}`).delete();
    }
}