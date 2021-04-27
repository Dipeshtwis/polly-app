import React, { useEffect, useState } from "react";
import { either, isEmpty, isNil } from "ramda";
import { ToastContainer } from "react-toastify";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger";
import { getFromLocalStorage } from "helpers/storage";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import Dashboard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import ShowPoll from "components/Polls/ShowPoll";
import EditPoll from "components/Polls/EditPoll";
import Signup from "components/Authentication/SignUp";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import PageLoader from "components/PageLoader";
import NavBar from "./components/NavBar";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <NavBar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <PrivateRoute
          path="/polls/:id/show"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={ShowPoll}
        />
        <PrivateRoute
          path="/polls/new"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={CreatePoll}
        />
        <PrivateRoute
          path="/polls/:id/edit"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={EditPoll}
        />
      </Switch>
    </Router>
  );
};

export default App;
