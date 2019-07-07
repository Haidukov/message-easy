import firebase from 'firebase';

export async function signOut() {
    await firebase.auth().signOut();
}
