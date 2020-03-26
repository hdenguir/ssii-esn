import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from './Alert';
import NotFound from './NotFound';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import PrivateRoute from '../routing/PrivateRoute';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import PostSingle from '../posts/PostSingle';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NonLandingPages extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <Alert />
          <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:id" component={Profile} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute
              path="/edit-profile"
              component={EditProfile}
            />
            <PrivateRoute
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              path="/add-education"
              component={AddEducation}
            />
            <PrivateRoute path="/posts" component={Posts} />
            <PrivateRoute path="/post/:id" component={PostSingle} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </>
    );
  }
}
export default NonLandingPages;
