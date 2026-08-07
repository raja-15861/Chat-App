import React from 'react'
import { MessageSquare, Settings, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../services/Operations/auth';

function Navbar() {
  const user = useSelector((state) => state.user?.user);
  // Real session indicator: user is only populated after a successful server-verified
  // login/signup/checkAuth. The localStorage "user" is set by those same flows.
  const isLoggedIn = Boolean(user || localStorage.getItem("user"));

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <div className='bg-gray-800 flex justify-between px-8 items-center w-full h-24'>
      {/* logo */}
      <Link to={isLoggedIn ? "/" : "/login"} className='flex items-center gap-x-3 h-full'>
        <MessageSquare className='h-12 w-12' />
        <h1 className='text-2xl font-semibold '>Chat App</h1>
      </Link>

      <div className='flex gap-x-3 items-center'>
        {/* settings */}
        {isLoggedIn && (
          <Link to='/settings' className='h-full flex items-center'>
            <Settings className='h-6 w-6' />
          </Link>
        )}

        {/* chat link */}
        {isLoggedIn && (
          <Link to='/chat' className='h-full flex items-center btn btn-sm'>
            <MessageSquare className='h-5 w-5' /> Chat
          </Link>
        )}

        {/* profile */}
        {isLoggedIn && (
          <Link to='/profile' className='flex items-center gap-2'>
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-primary/50 ring-offset-1">
                <img
                  src={
                    user?.image ||
                    user?.profilePic ||
                    "https://api.dicebear.com/5.x/initials/svg?seed=" +
                      (user?.fullName || "user")
                  }
                  alt={user?.fullName || "User"}
                />
              </div>
            </div>
            <User className='h-6 w-6 lg:hidden' />
          </Link>
        )}

        {/* logout */}
        {isLoggedIn && (
          <button className='bg-transparent' onClick={handleLogout}>
            <LogOut className='h-6 w-6' />
          </button>
        )}

        {/* auth links when logged out */}
        {!isLoggedIn && (
          <>
            <Link to='/login' className='btn btn-ghost btn-sm'>
              Login
            </Link>
            <Link to='/signup' className='btn btn-primary btn-sm'>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;

