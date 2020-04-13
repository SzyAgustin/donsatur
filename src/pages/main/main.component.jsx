import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import SignUpButton from '../../components/sign-up-button/sign-up-button.component';
import PostasSelect from '../../components/postas-select/postas-select.component';
import ChooseTurno from '../../components/choose-turno/choose-turno.component';

const firestore = firebase.firestore();

const MainComp = ({ currentUser }) => {
    const [postas, setPostas] = useState(null);
    const [postaSelected, setPostaSelected] = useState(null);


    useEffect(() => {
        const fetchFunc = async () => {
            const response = await firestore.collection('/postas').get();
            console.log(response.docs.map(doc => doc.data()));
            setPostas(response.docs.map(doc => doc.data()));
        }
        fetchFunc();
    }, []);

    // useEffect(() => { console.log(postas) }, [postas]);
    // useEffect(() => { console.log(postaSelected) }, [postaSelected]);

    function handleChange(selectedValue) {
        setPostaSelected(selectedValue);
    }

    return (
        <div>
            <SignUpButton currentUser={currentUser} />
            <p></p>
            <PostasSelect postas={postas} onSelectChange={handleChange} />
            <p></p>
            <ChooseTurno postaSelected={postaSelected} />

        </div>
    );
}


export default MainComp;