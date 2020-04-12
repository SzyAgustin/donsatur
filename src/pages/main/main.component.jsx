import React, { useState, useEffect } from 'react';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

const MainComp = () => {
    // const [user, setUser] = useState(null);
    const [postas, setPostas] = useState(null);
    // unsubscribeFromAuth = null;

    useEffect(() => {
        const fetchFunc = async () => {
            const response = await firestore.collection('/postas').get();
            setPostas(response);
        }
        fetchFunc();
    }, []);

    return (
        postas ? postas.docs.map(doc => {
            <h1>{ doc.data().nombre }</h1>
        }) : <h1>aaa</h1>
    );
}


export default MainComp;