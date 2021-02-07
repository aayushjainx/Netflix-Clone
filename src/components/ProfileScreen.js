import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../backend/firebase';
import { selectSubscription } from '../features/subscriptionSlice';
import { selectUser } from '../features/userSlice';
import '../styles/ProfileScreen.css';
import Nav from './Nav';
import PlanScreen from './PlanScreen';

function ProfileScreen() {
  const user = useSelector(selectUser);
  const activeSubscription = useSelector(selectSubscription);
  return (
    <div className='profileScreen'>
      <Nav />
      <div className='profileScreen__body'>
        <h1>Edit Profile</h1>
        <div className='profileScreen__info'>
          <img src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png' alt='Avatar' />
          <div className='profileScreen__details'>
            <h2>{user.email}</h2>
            <div className='profileScreen__plans'>
              <h3>Plans {activeSubscription ? `(Current Plan: ${activeSubscription.role})` : null}</h3>
              <PlanScreen />
              <button onClick={() => auth.signOut()} className='profileScreen__signOut'>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
