import React, { useRef, useState } from 'react';
import { auth } from '../backend/firebase';
import '../styles/SignupScreen.css';
import SigninScreen from './SigninScreen';

function SignupScreen({ email }) {
  const [signIn, setSignIn] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  console.log(email, 'email');

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      {signIn ? (
        <SigninScreen />
      ) : (
        <>
          <div className='signupScreen'>
            <form>
              <h1>Sign Up</h1>
              <input
                name='email'
                ref={emailRef}
                placeholder='Email'
                type='email'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <input ref={passwordRef} placeholder='Password' type='password' />
              <button type='submit' onClick={register}>
                Sign Up
              </button>
              <h4>
                <span className='signupScreen__gray'>Already have an account? </span>
                <span className='signupScreen__link' onClick={() => setSignIn(true)}>
                  Sign In.
                </span>
              </h4>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default SignupScreen;
