import firebase from 'firebase';

export async function getUsersByPhoneNumber(phoneNumber) {
    return new Promise(async (resolve, reject) => {
        const { data } = await firebase.functions().httpsCallable('getUserByPhoneNumber')({ phoneNumber });
        if (data.errorInfo) {
            reject(data.errorInfo.message);
        }
        else {
            resolve(data);
        }
    });
};
