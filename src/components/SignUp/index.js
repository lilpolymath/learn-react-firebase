import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onFormSubmit = event => {
    const { username, passwordOne, email } = this.state;
    this.props.firebase
      .doCreateUserWithUsernameAndPassword(email, passwordOne)
      .then(authUser => this.setState({ ...INITIAL_STATE }))
      .catche(error => this.setState(error));
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, passwordOne, passwordTwo, error, username } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          name='username'
          type='text'
          value={username}
          onChange={this.onChange}
          placeholder='Full name'
        />
        <input
          name='email'
          type='text'
          value={email}
          onChange={this.onChange}
          placeholder='Email Address'
        />
        <input
          name='passwordOne'
          type='password'
          value={passwordOne}
          onChange={this.onChange}
          placeholder='Your Password'
        />
        <input
          name='passwordTwo'
          type='password'
          value={passwordTwo}
          onChange={this.onChange}
          placeholder='Confirm Password'
        />
        <button isDisabled={isInvalid} type='submit'>
          Submit
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account yet? <Link to={ROUTES.SIGN_UP}>Sign up here.</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
