// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';

import { useState } from 'react';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // const [showMenu,setShowMenu] = useState(false)
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <LoginFormModal/>
      <SignupFormModal/>
        
      </>
    );
  }

  return (
    <ul>
      <li>
      <div className='home'></div>
        <NavLink exact to="/spotCreate">
        <button>Become a Host</button>
        
        </NavLink>
        
        <NavLink exact to="/"><img src="https://i.ibb.co/7NMVBTx/fflogo.png" alt="fflogo" border="0"></img></NavLink>
       <div/>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;