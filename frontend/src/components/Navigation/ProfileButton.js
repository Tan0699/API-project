// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './prof.css';
import { useHistory } from "react-router-dom";
function ProfileButton({ user,setsign,setlog }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
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

  const logout = (e) => {
    e.preventDefault();
    setlog(false)
    setsign(false)
    dispatch(sessionActions.logout());
    history.push('/')
  };
  
  return (
    <>
    <div className="profcontainer">
      <div id="profile" onClick={openMenu}>
        <div className="icon6">
      <img id="icon5" src="https://i.ibb.co/zJ2LJ1h/icon2.png" alt="icon2" />
      </div>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="content">
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <button id="logoutbutton" onClick={logout}>Log Out</button>
          </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default ProfileButton;