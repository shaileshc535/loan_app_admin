import React, { Fragment } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { Routes1 } from "../routes";
import { useSelector } from "react-redux";

// import Profile from "../components/Include/Profile";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import LoanCategoryList from "../components/LoanCategory/LoanCategoryList";
// import ManageNotification from "../components/Notification/ManageNotification";

const HomePage = () => {
  const isLoginData = useSelector((state) => state.AuthReducer);

  let { isSigninIn } = isLoginData;

  return (
    <HashRouter basename="/">
      {isSigninIn === false ? (
        <>
          <Routes>
            <Route exact path={Routes1.Dashboard.path} element={<Login />} />
            <Route exact path={Routes1.SignUp.path} element={<Register />} />
          </Routes>
        </>
      ) : (
        <>
          <Fragment>
            <Sidebar />
            <Navbar />
          </Fragment>
          <Routes>
            <Route
              exact
              path={Routes1.Dashboard.path}
              element={<LoanCategoryList />}
            />
            <Route
              exact
              path={Routes1.LoanCategory.path}
              element={<LoanCategoryList />}
            />

            {/* <Route
              exact
              path={Routes1.Notification.path}
              element={<ManageNotification />}
            /> */}
          </Routes>
          <Fragment>
            <Footer />
          </Fragment>
        </>
      )}
    </HashRouter>
  );
};

export default HomePage;
