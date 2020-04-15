import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useDispatch } from "react-redux";
import { setTurnosOfPosta2 } from "../../redux/general/general.actions";
import FormTurno from "../../components/form/form-turno.component";
import { addDays } from 'date-fns';

const firestore = firebase.firestore();

const MainComp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFunc = async () => {
      const response = await firestore
        .collection("/turnos")
        .where("postaId", "==", "2")
        .get();
      dispatch(setTurnosOfPosta2(response.docs.map((doc) => doc.data())));
    };
    fetchFunc();
  }, []);

  return (
    <div>
      <FormTurno />
    </div>
  );
};

export default MainComp;
