import { createSlice } from '@reduxjs/toolkit';

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    subscription: null,
  },
  reducers: {
    active: (state, action) => {
      state.subscription = action.payload;
    },
    subslogout: (state) => {
      state.subscription = null;
    },
  },
});

export const { active, subslogout } = subscriptionSlice.actions;

export const selectSubscription = (state) => state.subscription.subscription;

export default subscriptionSlice.reducer;
