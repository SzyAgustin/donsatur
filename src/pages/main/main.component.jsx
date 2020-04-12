import React, { useState, useEffect } from 'react';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

const MainComp = ({ currentUser }) => {
    const [postas, setPostas] = useState(null);

    useEffect(() => {
        const fetchFunc = async () => {
            const response = await firestore.collection('/postas').get();
            setPostas(response.docs.map(doc => doc.data()));
        }
        fetchFunc();
    }, []);

    useEffect(() => {console.log(postas)},[postas]);

    return (
        currentUser ? 
        <button onClick={ ()=> auth.signOut() }>Sign out</button> :
        <button onClick={ signInWithGoogle }>Sign in with Google</button>

        
        // <select name="postas" id="postas">
        //     {/* {postas ? 
        //     postas.map(posta => )
        // } */}
        // </select>
    );
}


export default MainComp;