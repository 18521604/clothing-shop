import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyB6_sMECrxMJjEhF_gEhAYmP3ifnwyUwyo",
    authDomain: "clothing-shop-db-41233.firebaseapp.com",
    projectId: "clothing-shop-db-41233",
    storageBucket: "clothing-shop-db-41233.appspot.com",
    messagingSenderId: "14632443174",
    appId: "1:14632443174:web:050c9669d6ee117b6bf5e7",
    measurementId: "G-HZN3JK3YL1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            await userRef.set({
                displayName: displayName,
                email,
                createAt,
                ...additionalData,
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;