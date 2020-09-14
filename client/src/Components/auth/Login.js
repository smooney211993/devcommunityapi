import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formState;
  const handleFormState = (event) =>
    setFormState({ ...formState, [event.target.name]: event.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Sign in</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Log in
      </p>
      <form className='form' action='create-profile.html' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            onChange={handleFormState}
            value={email}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            onChange={handleFormState}
            value={password}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Dont have an account? <Link to='register'>Register</Link>
      </p>
    </>
  );
};
Login.prototype = {
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};
const mappedStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mappedStateToProps, { login })(Login);
