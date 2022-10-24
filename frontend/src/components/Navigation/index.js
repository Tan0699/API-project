// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormModal from '../SignupFormModal';
import { Modal } from '../../context/Modal';
import { useState,useEffect } from 'react';
import SignupForm from '../SignupFormModal/SignupForm';

function Navigation({ isLoaded }){
  const [log, setlog] = useState(false);
  const [sign, setsign] = useState(false);

  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} 
        setsign={setsign}
        setlog={setlog}
      />
      
    );
  } else {
    sessionLinks = (
      <>
      <div className='nowrap'>
      <div id="profile" onClick={openMenu}>
        <img id="icon7" src="https://i.ibb.co/zJ2LJ1h/icon2.png" alt="icon2" />
        </div>
       <div className='lognsign'>
      {showMenu && (
        <div className='thelog' onClick={() => (setlog(true))}>Log In</div>
        
        )}
      {log && (
         <Modal onClose={() => setlog(false)}>
         <LoginForm />
       </Modal>
      )}



{showMenu && (
      <div className='thesign' onClick={(e) => (setsign(true))}>Sign Up</div>
      )}
      {sign && (
        <Modal onClose={() => setsign(false)}>
          <SignupForm />
        </Modal>
      )}
      </div>
      {/* <LoginFormModal/> */}
      </div>
      </>
    );
  }

  return (
    <div className='navcontainer'>
      <div className='navwrap'>
        
        <div className='logowrapwrap'>
        <NavLink exact to="/"><img id='logowrap' src="https://i.ibb.co/7NMVBTx/fflogo.png" alt="fflogo" border="0"></img></NavLink>
        </div>
       
        <div className='otherwrap'>
        {!!sessionUser?
        <NavLink exact to="/spotCreate">
        <img id='hostpic' src="https://i.ibb.co/FVGhx1r/hostpic.png" alt="hostpic" border="0"/>
        
        </NavLink>:null}
       <div/>
        {isLoaded && sessionLinks}
        </div>
      </div>
      </div>
  );
}

export default Navigation;