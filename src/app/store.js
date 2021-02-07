import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import subscriptionReducer from '../features/subscriptionSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    subscription: subscriptionReducer,
  },
});
