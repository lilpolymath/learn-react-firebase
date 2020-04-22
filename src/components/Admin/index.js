import React from 'react';

import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

const Admin = () => (
  <div>
    <h1>Admin</h1>
    <p>This page is only accessible by adminstrators.</p>
  </div>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(Admin);
