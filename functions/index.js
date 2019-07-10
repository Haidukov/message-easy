const functions = require('firebase-functions');
const admin = require('firebase-admin');
require('cors')({ origin: true });

admin.initializeApp();

exports.getUsers = functions.https.onRequest((request, response) => {
    response.send('Hello from firebase');
});

exports.getUserByPhoneNumber = functions.https.onCall(async (data) => {
    const { phoneNumber } = data ;

    if (!phoneNumber) return { error: 'You should pass phoneNumber' };

    try {
        const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
        const user = userRecord.toJSON();
        return {
            id: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            email: user.email,
            lastSignIn: user.metadata.lastSignInTime
        };
    } catch (e) {
        return e;
    }
});
