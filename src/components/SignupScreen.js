import React from 'react';
import '../styles/SignupScreen.css';

function SignupScreen() {
  return (
    <div className='signupScreen'>
      <form>
        <h1>SignIn</h1>
        <input placeholder='Email' type='email' />
        <input placeholder='Password' type='password' />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
}

export default SignupScreen;
