import { combineReducers } from "@reduxjs/toolkit";

import authReducer from '../slices/authSlices';
import profileReducer from '../slices/profileSlice'
const rootReducer=combineReducers({
  auth:authReducer, 
  user:profileReducer
})

export default rootReducer;