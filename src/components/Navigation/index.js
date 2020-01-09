import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = authUser => (
  <div>{authUser ? <AuthNavigation /> : <NonAuthNavigation />}</div>
);

const AuthNavigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}> Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}> My Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);
const NonAuthNavigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
