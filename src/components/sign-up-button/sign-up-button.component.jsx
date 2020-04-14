import React from 'react';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils';
import { useSelector } from 'react-redux';

const SignUpButton = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    console.log(currentUser);

    return (
        currentUser ?
            <button onClick={() => auth.signOut()}>Sign out</button> :
            <button onClick={signInWithGoogle}>Sign in with Google</button>
    );

}

export default SignUpButton;