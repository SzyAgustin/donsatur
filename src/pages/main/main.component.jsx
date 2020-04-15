import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useDispatch } from "react-redux";
import { setTurnosOfPosta2 } from "../../redux/general/general.actions";
import { setDate } from "../../redux/form/form.actions";
import FormTurno from "../../components/form/form-turno.component";

const firestore = firebase.firestore();

const MainComp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFunc = async () => {
      const response = await firestore
        .collection("/turnos")
        .where("postaId", "==", "2")
        .get();
      console.log(response.docs.map((doc) => doc.data()));
      dispatch(setTurnosOfPosta2(response.docs.map((doc) => doc.data())));

      const today = new Date();
      today.setHours(8, 0, 0, 0);
      dispatch(setDate(today));
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
