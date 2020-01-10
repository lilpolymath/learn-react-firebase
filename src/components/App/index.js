import React from 'react';
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

import { withAuthentication } from '../Session';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
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
};

export default withAuthentication(App);
