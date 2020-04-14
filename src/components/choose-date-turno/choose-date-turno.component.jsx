import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
 
import "react-datepicker/dist/react-datepicker.css";

const firestore = firebase.firestore();

const ChooseDateTurno = ({ postaSelected, dateSelected, onDateChange }) => {
    const [turnos, setTurnos] = useState(null);
    // const [dateSelected, setDateSelected] = useState(null);

    useEffect(() => {
        const fetchFunc = async () => {
            const response = await firestore.collection('/turnos').where("postaId", "==", postaSelected).get();
            setTurnos(response.docs.map(doc => doc.data()));
        }
        fetchFunc();
    }, [postaSelected]);

    useEffect(() => {
        console.log(turnos)
    }, [turnos]);

    function handleChange(event) {
        onDateChange(event);
    }
    
    return (
        postaSelected ? 
        <DatePicker selected={dateSelected} onChange={handleChange} />
        :
        <p></p>
    );
}

export default ChooseDateTurno;