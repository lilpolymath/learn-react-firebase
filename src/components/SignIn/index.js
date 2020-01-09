import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState([...INITIAL_STATE]);
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => this.setState({ error }));
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='email'
          type='text'
          value={email}
          onChange={this.onChange}
          placeholder='Email Address'
        />
        <input
          name='password'
          type='password'
          value={password}
          onChange={this.onChange}
          placeholder='Password'
        />
        <button onSubmit={this.onSubmit} disabled={isInvalid} type='submit'>
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInFormBase, SignUpLink };
