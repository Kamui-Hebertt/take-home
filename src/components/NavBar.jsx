import React from 'react';
import './NavBar.css'; // Import the CSS file for styling

const NavBar = () => {

  const logout = () => {
 
    localStorage.removeItem('token');
  

    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button className="logout-button" onClick={logout}>Sair</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
