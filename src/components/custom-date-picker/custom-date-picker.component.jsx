import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurnosNotAvailable } from "../../redux/general/general.actions";
import { setDate } from "../../redux/form/form.actions";
import DatePicker from "react-datepicker";
import { addDays, addMinutes } from "date-fns";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import setMilliseconds from "date-fns/setMilliseconds";


const CustomDatePicker = () => {
  const dispatch = useDispatch();
  const turnosOfPosta2 = useSelector((state) => state.general.turnosOfPosta2);
  const dateSelected = useSelector((state) => state.form.dateSelected);
  const turnosNotAvailable = useSelector(
    (state) => state.general.turnosNotAvailable
  );

  const groupByCount = (list) => {
    const result = list.reduce((total, value) => {
      total[value] = (total[value] || 0) + 1;
      return total;
    }, {});

    var result2 = Object.keys(result).map(function (key) {
      return [new Date(key), result[key]];
    });
    return result2;
  };

  const getTurnosNotAvailable = (listOfTurnos, limit) => {
    const groupedBy = groupByCount(listOfTurnos);
    const filtered = groupedBy.filter((turno) => turno[1] >= limit);
    const arrayOfDates = filtered.map((turno) => turno[0]);
    return arrayOfDates;
  };

  useEffect(() => {
      dispatch(setDate(setHours(setMinutes(setSeconds(setMilliseconds(addDays(new Date(), 1),0),0), 0), 8)));
  }, [turnosOfPosta2]);

  useEffect(() => {
    console.log(dateSelected);
    if (turnosOfPosta2 && dateSelected) {
      //ESTO HAY QUE ARREGLARLO. CAPAZ CON UN OBSERVABLE
      const days = turnosOfPosta2.map(
        (turno) => new Date(turno.fecha.seconds * 1000)
      );

      const allTurnos = days.filter(
        (date) =>
          date.getDate() === dateSelected.getDate() &&
          date.getMonth() === dateSelected.getMonth() &&
          date.getFullYear() === dateSelected.getFullYear()
      );

      dispatch(setTurnosNotAvailable(getTurnosNotAvailable(allTurnos, 6)));
    }
  }, [dateSelected, turnosOfPosta2]);

  useEffect(() => {
    
  },[turnosNotAvailable])


  function onDatepickerRef(el) {
    if (el && el.input) {
      el.input.readOnly = true;
    }
  }

  return (
    <DatePicker
      selected={dateSelected}
      minDate={addDays(new Date(), 1)}
      excludeTimes={turnosNotAvailable}
      onChange={(date) => dispatch(setDate(date))}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 8)}
      maxTime={setHours(setMinutes(new Date(), 30), 12)}
      dateFormat="MMMM d, yyyy h:mm aa"
      ref={(el) => onDatepickerRef(el)}
    />
  );
};

export default CustomDatePicker;
