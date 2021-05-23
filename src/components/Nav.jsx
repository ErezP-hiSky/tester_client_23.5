import React from 'react';
import { Link } from 'react-router-dom';
import '../sass/main.scss';


function Nav() {
  return (
    <nav>
        <ul className="nav-links">
          <Link className="nav-style" to="/">
              <li>Home</li>
          </Link>
          <Link className="nav-style" to="/management">
              <li>Management</li>
          </Link>
          <Link className="nav-style" to="/search-options">
              <li>Technician</li>
          </Link>
        </ul>
    </nav>
  );
}

export default Nav;
