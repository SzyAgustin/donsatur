import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import SignUpButton from '../../components/sign-up-button/sign-up-button.component';
import PostasSelect from '../../components/postas-select/postas-select.component';
import ChooseDateTurno from '../../components/choose-date-turno/choose-date-turno.component';
import { useSelector, useDispatch } from 'react-redux';
import { setTurnosOfPosta2 } from '../../redux/general/general.actions';

const firestore = firebase.firestore();



const MainComp = () => {
    const dispatch = useDispatch();
    const turnosOfPosta2 = useSelector(state => state.general.turnosOfPosta2);

    useEffect(() => {
        const fetchFunc = async () => {
            const response = await firestore.collection('/turnos').where("postaId", "==", "2").get();
            console.log(response.docs.map(doc => doc.data()));
            dispatch(setTurnosOfPosta2(response.docs.map(doc => doc.data())));
        }
        fetchFunc();
    }, []);

    useEffect(() => {
        console.log(turnosOfPosta2);
    }, [turnosOfPosta2])
    

    return (
        <div>
            {/* <SignUpButton /> */}
            {/* <p></p>
            <PostasSelect postas={postas} onSelectChange={handleChangePosta} />
            <p></p>
            <ChooseDateTurno postaSelected={postaSelected} selected={dateSelected} onDateChange={handleChangeDateTurno} /> */}


        </div>
    );
}

export default MainComp;