import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

const ChooseTurno = ({ postaSelected }) => {
    const [turnos, setTurnos] = useState(null);

    useEffect(() => {
        const fetchFunc = async () => {
            const response = await firestore.collection('/turnos').get();
            setTurnos(response.docs.map(doc => doc.data()));
        }
        fetchFunc();
    }, []);

    useEffect(() => {
        console.log(turnos)
    }, [turnos]);

    return (
        postaSelected ? 
        <div> {postaSelected} </div> :
        <p></p>

    );
}

export default ChooseTurno;