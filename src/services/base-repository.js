import * as firebase from 'firebase';
import BaseClient from './base-client';

export default class BaseRepository extends BaseClient{
    db;

    async init() {
        this.db = firebase.firestore();
    }

    getTimestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }
}
