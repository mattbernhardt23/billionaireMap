import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import authReducer from '@features/auth/authSlice';
import billionaireReducer from '@features/billionaires/billionaireSlice';




export const store = configureStore({
  reducer: {
    auth: authReducer,
    billionaireData: billionaireReducer,
  },
}, applyMiddleware(thunkMiddleware));
