import React, { useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { setTurnosOfDateSelected } from '../../redux/general/general.actions';
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { setDate } from '../../redux/form/form.actions';

const CustomDatePicker = () => {
  const dispatch = useDispatch();
  const turnosOfPosta2 = useSelector((state) => state.general.turnosOfPosta2);
  const dateSelected = useSelector((state) => state.form.dateSelected);
  const turnosOfDateSelected = useSelector(
    (state) => state.general.turnosOfDateSelected
  );

  useEffect(() => {
    if (turnosOfPosta2) {
      //ESTO HAY QUE ARREGLARLO. CAPAZ CON UN OBSERVABLE
      const days = turnosOfPosta2.map(
        (turno) => new Date(turno.fecha.seconds * 1000)
      );
      dispatch(
        setTurnosOfDateSelected(
          days.filter(
            (date) =>
              date.getDate() === dateSelected.getDate() &&
              date.getMonth() === dateSelected.getMonth() &&
              date.getFullYear() === dateSelected.getFullYear()
          )
        )
      );
    }
  }, [dateSelected]);

  return (
    <DatePicker
      selected={dateSelected}
      minDate={new Date()}
      excludeTimes={turnosOfDateSelected}
      onChange={(date) => dispatch(setDate(date))}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 8)}
      maxTime={setHours(setMinutes(new Date(), 0), 18)}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default CustomDatePicker;
