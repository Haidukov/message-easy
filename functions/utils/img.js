const { storage } = require('firebase-functions');

async function getDownloadURL(photoURL) {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(photoURL);
    return await imageRef.getDownloadURL()
}

module.exports = {
    getDownloadURL
};
