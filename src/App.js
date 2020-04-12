import React, { useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import logo from './logo.svg';
import './App.css';

import MainComp from './pages/main/main.component';


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // unsuscribeFromAuth = null;

    useEffect(() => {
      auth.onAuthStateChanged(async userAuth => {
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapshot => {
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            });
          });
        } else {
          setCurrentUser(userAuth);
        }
      });

      // return() => this.unsuscribeFromAuth();
      
    }, []);

    useEffect(() => {console.log(currentUser)}, [currentUser]);


  return (
    <div className="App">
      <header className="App-header">
        <p>
          <MainComp currentUser={ currentUser }/>
        </p>
      </header>
    </div>
  );
}

export default App;
