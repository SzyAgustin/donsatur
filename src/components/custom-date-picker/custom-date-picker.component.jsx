import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurnosOfDateSelected } from "../../redux/general/general.actions";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { setDate } from "../../redux/form/form.actions";

const CustomDatePicker = () => {
  const dispatch = useDispatch();
  const turnosOfPosta2 = useSelector((state) => state.general.turnosOfPosta2);
  const dateSelected = useSelector((state) => state.form.dateSelected);
  const turnosNotAvailables = useSelector(
    (state) => state.general.turnosNotAvailable
  );

  const groupByCount = (list) => {
    const result = list.reduce((total, value) => {
      total[value] = (total[value] || 0) + 1;
      return total;
    }, {});

    var result2 = Object.keys(result).map(function(key) {
      return [new Date(key), result[key]];
    });
    return result2;
  }

  const getMoreThanLimit = (listOfTurnos, limit) => {
      const groupedBy = groupByCount(listOfTurnos);
      const filtered =  groupedBy.filter(turno => turno[1] >= limit );
      const arrayOfDates = filtered.map(turno => turno[0]);
      return arrayOfDates;
  }



  useEffect(() => {
    if (turnosOfPosta2) {
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

      dispatch(
        setTurnosOfDateSelected(
          getMoreThanLimit(allTurnos, 5)
        )
      );
    }
  }, [dateSelected]);

  useEffect(() => {
    console.log(turnosNotAvailables);
  }, [turnosNotAvailables]);

  function onDatepickerRef(el) {
    if (el && el.input) {
      el.input.readOnly = true;
    }
  }

  return (
    <DatePicker
      selected={dateSelected}
      minDate={new Date()}
      excludeTimes={turnosNotAvailables}
      onChange={(date) => dispatch(setDate(date))}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 8)}
      maxTime={setHours(setMinutes(new Date(), 0), 18)}
      dateFormat="MMMM d, yyyy h:mm aa"
      ref={(el) => onDatepickerRef(el)}
    />
  );
};

export default CustomDatePicker;
