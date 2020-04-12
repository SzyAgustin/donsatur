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
        <customSelect values={postas} />
    );
}


export default MainComp;