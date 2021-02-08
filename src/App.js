import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import db, { auth } from './backend/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { active, selectSubscription, subslogout } from './features/subscriptionSlice';
import ProfileScreen from './components/ProfileScreen';

function App() {
  const user = useSelector(selectUser);
  const subscription = useSelector(selectSubscription);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );

        console.log(userAuth, 'userAuth');
      } else {
        dispatch(logout());
        dispatch(subslogout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection('customers')
          .doc(user.uid)
          .collection('subscriptions')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
              dispatch(
                active({
                  role: subscription.data().role,
                  current_period_end: subscription.data().current_period_end.seconds,
                  current_period_start: subscription.data().current_period_start.seconds,
                })
              );
            });
          });
      }
    });
  }, [user]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        subscription ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/profile',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );

  return (
    <div className='App'>
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path='/browse' component={HomeScreen} />
            <Route exact path='/profile'>
              <ProfileScreen />
            </Route>
            <Redirect to='/browse' />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
