import React from 'react';
import logo from '../images/SMART_logo.png';

const Header = () => {
  return (
    <header>
      <a href="home.html"><img src={logo} alt="Logo" className="logo-image" /></a>
      <h1><a href="home.html" className="nav-link">Automatic Value Stream Mapping</a></h1>
      <nav>
        <ul>
          <li><a href="https://sites.ualberta.ca/~rafiq1/" target="_blank" rel="noopener noreferrer">SMART LAB</a></li>
          <li><a href="#">Former Maps</a></li>
          <li><a href="authors.html" target="_blank" rel="noopener noreferrer">Authors</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;