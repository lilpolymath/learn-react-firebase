import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  error: null,
};

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState([...INITIAL_STATE]);
        this.props.history.push(ROUTES.SIGN_IN);
      })
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='email'
          type='email'
          value={email}
          onChange={this.onChange}
          placeholder='Email Address'
        />
        <button onSubmit={this.onSubmit} disabled={isInvalid} type='submit'>
          Send Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}> Forgot Password? </Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetLink, PasswordForgetForm };
