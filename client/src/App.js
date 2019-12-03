import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import setAuthToken from "./utils/setAuthToken";

import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import PostSingle from "./components/posts/PostSingle";

import { loadUser } from "./actions/auth";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/profile/:id" component={Profile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/create-profile" component={CreateProfile} />
              <PrivateRoute path="/edit-profile" component={EditProfile} />
              <PrivateRoute path="/add-experience" component={AddExperience} />
              <PrivateRoute path="/add-education" component={AddEducation} />
              <PrivateRoute path="/posts" component={Posts} />
              <PrivateRoute path="/post/:id" component={PostSingle} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
