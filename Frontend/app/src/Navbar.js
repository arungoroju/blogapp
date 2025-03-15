// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#282c34', color: 'white' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </li>
        <li>
          <Link to="/create" style={{ color: 'white', textDecoration: 'none' }}>Create Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
