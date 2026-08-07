import { combineReducers } from "@reduxjs/toolkit";

import authReducer from '../slices/authSlices';
import profileReducer from '../slices/profileSlice';
import messageReducer from '../slices/messageSlice';

const rootReducer=combineReducers({
  auth:authReducer, 
  user:profileReducer,
  message:messageReducer
})

export default rootReducer;