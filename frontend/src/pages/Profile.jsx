import React, { useState } from 'react'
import { updateProfile } from '../services/Operations/auth';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user)
  const [uploadImage,setUploadImage]=useState()
  const handleUploadImage=(e)=>{
    e.preventDefault();
    dispatchEvent(updateProfile(uploadImage));
  }
  return (
    <div>Profile</div>
    
  )
}

export default Profile;