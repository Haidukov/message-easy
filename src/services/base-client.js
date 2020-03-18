export default class BaseClient {
    constructor() {
        this._waitForFirebase(() => this.init());
    }

    _waitForFirebase(callback) {
        setTimeout(() => callback());
    }

    init() {}
}
