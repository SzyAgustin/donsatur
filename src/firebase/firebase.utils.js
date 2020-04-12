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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



