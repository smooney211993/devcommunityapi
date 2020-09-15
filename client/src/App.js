import React, { useEffect } from 'react';
import Navbar from './Components/layout/Navbar';
import Landing from './Components/layout/Landing';
import Routes from './Components/routing/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { loadUser } from './actions/auth';

// redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />

          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};
export default App;
