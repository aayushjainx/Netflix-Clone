import React, { useState } from 'react';
import '../styles/LoginScreen.css';
import SigninScreen from './SigninScreen';
import SignupScreen from './SignupScreen';

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className='loginScreen'>
      <div className='loginScreen__background'>
        <img
          className='loginScreen__logo'
          src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
          alt='Netflix Logo'
          onClick={() => {
            setSignIn(false);
            setSignUp(false);
          }}
        />
        <button className='loginScreen__button' onClick={() => setSignIn(true)}>
          Sign In
        </button>
        <div className='loginScreen__gradient' />
        <div className='loginScreen__body'>
          {signIn ? (
            <SigninScreen />
          ) : signUp ? (
            <SignupScreen email={email} />
          ) : (
            <>
              <h1>Unlimited Films, TV programmes and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
              <div className='loginScreen__input'>
                <form>
                  <input
                    name='email'
                    type='email'
                    placeholder='Email Address'
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <button className='loginScreen__getStarted' onClick={() => setSignUp(true)}>
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
