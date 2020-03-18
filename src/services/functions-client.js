import * as firebase from 'firebase';
import BaseClient from './base-client';

export default class FunctionsClient extends BaseClient {
    _api;

    init() {
        this._api = firebase.functions();
    }

    call(functionName, params) {
        return this._api.httpsCallable(functionName)(params).then(response => response.data);
    }
}
