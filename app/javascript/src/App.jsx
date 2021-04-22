import React, { useEffect } from "react";
import { either, isEmpty, isNil } from "ramda";
import { ToastContainer } from "react-toastify";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import initializeLogger from "common/logger";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import Dashboard from "components/Dashboard";
import Signup from "components/Authentication/Signup";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import PageLoader from "components/PageLoader";

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
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
