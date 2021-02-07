import React, { useRef, useState } from 'react';
import { auth } from '../backend/firebase';
import '../styles/SigninScreen.css';
import SignupScreen from './SignupScreen';

function SigninScreen() {
  const [signUp, setSignUp] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      {signUp ? (
        <SignupScreen />
      ) : (
        <>
          <div className='signinScreen'>
            <form>
              <h1>Sign In</h1>
              <input ref={emailRef} placeholder='Email' type='email' />
              <input ref={passwordRef} placeholder='Password' type='password' />
              <button type='submit' onClick={signIn}>
                Sign In
              </button>
              <h4>
                <span className='signinScreen__gray'>New to Netflix? </span>
                <span className='signinScreen__link' onClick={() => setSignUp(true)}>
                  Sign Up now.
                </span>
              </h4>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default SigninScreen;
