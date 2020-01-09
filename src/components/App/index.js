import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import AccountPage from '../Account';
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import AdminPage from '../Admin';
import HomePage from '../Home';
import PasswordForgetPage from '../PasswordForget';
import SignUpPage from '../SignUp';
import * as ROUTES from '../../constants/routes';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }
  render() {
    return (
      <Router>
        <div className='header'>
          <Navigation authUser={this.state.authUser} />
          <hr />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        </div>
      </Router>
    );
  }
}

export default App;
