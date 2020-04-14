import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import { setTime } from '../../redux/form/form.actions'


const CustomTimePicker = () => {
    const dispatch = useDispatch();
    const turnosOfDateSelected = useSelector(state => state.general.turnosOfDateSelected);
    const dateSelected = useSelector(state => state.form.dateSelected);
    const timeSelected = useSelector(state => state.form.timeSelected);


    useEffect(() => {
        console.log(timeSelected);
    }, [timeSelected]);

    return (
        dateSelected ?
        <DatePicker
            selected={dateSelected}
            onChange={date => dispatch(setTime(date))}
            showTimeSelect
            showTimeSelectOnly
            timeCaption="Time"
            dateFormat="h:mm aa"
        /> :
        <p></p>

    );
}

export default CustomTimePicker;