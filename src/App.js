import React from "react";
import { Provider } from "react-redux";
import jwt from "jsonwebtoken";
import store from "./redux/store";
import { setCurrentUser, signOut } from "./redux/action/authAction";
import setAuthorizationToken from "./redux/action/setAuthorization";
// core styles
import "./scss/volt.scss";
import "./App.css";
// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  if (
    localStorage.token !== null &&
    localStorage.token !== undefined &&
    localStorage.token !== ""
  ) {
    setAuthorizationToken(localStorage.token);
    jwt.verify(
      localStorage.token,
      process.env.REACT_APP_JWT_SECRET,
      function (err, decode) {
        if (err) {
          store.dispatch(signOut());
        } else {
          store.dispatch(setCurrentUser(decode));
        }
      }
    );
  }

  return (
    <div>
      <Provider store={store}>
        <HomePage />
        <ScrollToTop />
      </Provider>
    </div>
  );
}

export default App;
