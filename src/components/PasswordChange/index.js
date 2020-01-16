import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState([...INITIAL_STATE]);
      })
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='passwordOne'
          type='password'
          value={passwordOne}
          onChange={this.onChange}
          placeholder='New Password'
        />
        <input
          name='passwordTwo'
          type='password'
          value={passwordTwo}
          onChange={this.onChange}
          placeholder='Confirm New Password'
        />
        <button onSubmit={this.onSubmit} disabled={isInvalid} type='submit'>
          Change Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export default PasswordChangeForm;
