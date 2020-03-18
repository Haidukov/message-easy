const functions = require('firebase-functions');
const admin = require('firebase-admin');
const UserFactory = require('./models/user-factory');
require('cors')({ origin: true });

admin.initializeApp();

exports.getUserByPhoneNumber = functions.https.onCall(async (data) => {
    const { phoneNumber } = data ;

    if (!phoneNumber) throw new functions.https.HttpsError(400, 'You should pass phoneNumber');

    try {
        const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
        const user = userRecord.toJSON();
        const userFactory = new UserFactory(user);
        return await userFactory.createUser();
    } catch (e) {
        throw new functions.https.HttpsError(404, e.errorInfo.message);
    }
});



exports.getUserById = functions.https.onCall(async (data) => {
    const { userId } = data;

    if (!userId) throw new functions.https.HttpsError(400, 'You should pass id');

    try {
        const userRecord = await admin.auth().getUser(userId);
        const user = userRecord.toJSON();
        const userFactory = new UserFactory(user);
        return await userFactory.createUser();
    } catch (e) {
        throw new functions.https.HttpsError(404, e);
    }
});
