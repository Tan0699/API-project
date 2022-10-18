// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/Spots/AllSpots"
import ShowAllSpots from "./components/Spots/AllSpots";
import ShowSpot from './components/Spots/SpotDetails'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <ShowAllSpots/>
          </Route>
          <Route path='/spots/:spotId'>
            <ShowSpot/>
          </Route>
          {/* <Route path="/signup"> */}
            {/* <SignupFormPage /> */}
          {/* </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;