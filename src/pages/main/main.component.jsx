import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import SignUpButton from '../../components/sign-up-button/sign-up-button.component';
import PostasSelect from '../../components/postas-select/postas-select.component';
import { useSelector, useDispatch } from 'react-redux';
import { setTurnosOfPosta2, setTurnosOfDateSelected } from '../../redux/general/general.actions';
import { setDate } from '../../redux/form/form.actions';
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import CustomTimePicker from '../../components/custom-time-picker/custom-time-picker.component';

const firestore = firebase.firestore();



const MainComp = () => {
    const dispatch = useDispatch();
    const turnosOfPosta2 = useSelector(state => state.general.turnosOfPosta2);
    const dateSelected = useSelector(state => state.form.date);
    // const turnosOfDateSelected = useSelector(state => state.general.turnosOfDateSelected);

    // const [turnosOfDateSelected, setTurnosOfDateSelected] = useState(null);

    useEffect(() => {
        const fetchFunc = async () => {
            const response = await firestore.collection('/turnos').where("postaId", "==", "2").get();
            console.log(response.docs.map(doc => doc.data()));
            dispatch(setTurnosOfPosta2(response.docs.map(doc => doc.data())));

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dispatch(setDate(today));
        }
        fetchFunc();
    }, []);

    useEffect(() => {
        console.log(turnosOfPosta2);
        if (turnosOfPosta2){
            console.log(turnosOfPosta2[0].fecha);
        }

    }, [turnosOfPosta2])

    // const filterWithDate = () => {

    // }

    useEffect(() => {
        if (turnosOfPosta2) { //ESTO HAY QUE ARREGLARLO. CAPAZ CON UN OBSERVABLE
            const days = turnosOfPosta2.map(turno => new Date(turno.fecha.seconds * 1000));
            dispatch(setTurnosOfDateSelected(days.filter(date => date.setHours(0,0,0,0) == dateSelected.setHours(0,0,0,0) )));
        }
    }, [dateSelected])

    // useEffect(() => {
    //     console.log(turnosOfDateSelected)
    // }, [turnosOfDateSelected])


    return (
        <div>
            {/* <SignUpButton /> */}
            {/* <p></p>
            <PostasSelect postas={postas} onSelectChange={handleChangePosta} />
            <p></p> */}
            <DatePicker selected={dateSelected}
                minDate={new Date()}
                onChange={date => dispatch(setDate(date))}
            />

            {/* <CustomTimePicker /> */}








        </div>
    );
}

export default MainComp;