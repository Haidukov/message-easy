const { getDownloadURL } = require('../utils/img');

module.exports = class UserDTO {
    constructor(user = {}) {
        this.id = user.uid;
        this.name = user.displayName;
        this.photoURL = user.photoURL;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
        this.lastSignIn = user.metadata.lastSignInTime;
    }

    async fetchDownloadURL() {
        this.downloadPhotoURL = await getDownloadURL(this.photoURL);
    }
};
