import React from 'react'
import { MessageSquare } from "lucide-react";
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../services/Operations/auth';

function Navbar() {
  const auth=useSelector((state)=>state.auth);

  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(Logout())
  }
  return (
    <div className='bg-gray-800 flex justify-between px-8 items-center w-full h-24'>
      {/* logo */}
      <div className='flex items-center gap-x-3 h-full '>
        <MessageSquare  className='h-12 w-12'/>
        <h1 className='text-2xl font-semibold '>Chat App</h1>
      </div>


      <div className='flex gap-x-3 '>
        {/* div for setting */}
      <div className='h-full flex items-center'>
        <Link to='/settings'><Settings className='h-6 w-6'/></Link>
      </div>
      
      {/* div for profile */}
      
    {auth ? (
      <div className='h-full flex items-center'>
        <Link to='/profile'><User className='h-6 w-6'/></Link>
      </div>
    ) : null}  
      
      {/* div for Logout */}
      {auth ? (
        <div className='h-full flex items-center'>
        <button className='bg-transparent' onClick={handleLogout}>
          <LogOut className='h-6 w-6' />
        </button>
      </div>
      ) : null}
      
      </div>
    </div>
  )
}

export default Navbar