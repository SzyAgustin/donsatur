import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import MainComp from "./pages/main/main.component";
import SuccessUpdateToDatabase from "./pages/success-update-to-database/success-update-to-database.component";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      } else {
        dispatch(setCurrentUser(userAuth));
      }
    });
  }, []);

  return (
    <div className="App">
      <Route exact path='/' component={MainComp} />
      <Route exact path='/success' component={SuccessUpdateToDatabase} />
    </div>
  );
}

export default App;
