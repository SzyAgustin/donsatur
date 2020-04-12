import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDL_SKw5HtruQ-qViukWCZS8i5eYl2oUXA",
    authDomain: "donsatur-db.firebaseapp.com",
    databaseURL: "https://donsatur-db.firebaseio.com",
    projectId: "donsatur-db",
    storageBucket: "donsatur-db.appspot.com",
    messagingSenderId: "282468066069",
    appId: "1:282468066069:web:9076708a2e0f96f99b3f1c",
    measurementId: "G-43TLWXXRNE"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.mesagge);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = (collectionKey, objetsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



