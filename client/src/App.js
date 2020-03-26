import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './i18n';
import { Provider } from 'react-redux';

import Landing from './components/layout/Landing';
import NonLandingPages from './components/layout/NonLandingPages';

import { loadUser } from './actions/auth';

// Redux
import store from './store';

import './App.css';

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('token')) store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={NonLandingPages} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
