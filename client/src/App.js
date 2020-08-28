import React, { Fragment } from 'react';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <div className="container mx-auto px-4">
        <Route exact path="/" component={Landing} />
      </div>
      <div className="grid grid-cols-8">
        <div className="col-start-3 col-span-4">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </Fragment>
  </Router>
);

export default App;
