import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import PropTypes from 'prop-types'
import '../sass/main.scss';


function Nav() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const guestLinks = (
    <Fragment>
      <Link className="nav-style" to="/">
          Home
      </Link>
      <Link className="nav-style" to="/dashboard">
          DashBoard
      </Link>
      <Link className="nav-style" to="/search-options">
          Technician
      </Link>
      <Link className="nav-style" to="/register">
          Register
      </Link>
      <Link className="nav-style" to="/login">
          Login
      </Link>
    </Fragment>
  );

  const onLogout = () => {
    if (window.confirm('Are you sure to logout ?')) {
      logout();
    }
  }

  const authLinks = (
    <Fragment>
      <p className="nav-style__hello">
        Hello { user && user.name }
      </p>
      <Link className="nav-style" to="/">
          Home
      </Link>
      <Link className="nav-style" to="/dashboard">
          DashBoard
      </Link>
      <Link className="nav-style" to="/search-options">
          Technician
      </Link>

      <a onClick={onLogout} href="#!">
        <i className="fas fa-sign-out-alt"></i> {' '}
        <span className="nav-style">Logout</span>
      </a>
      
    </Fragment>
  );

  

  return (
    <div className="topnav">
        { isAuthenticated ? authLinks : guestLinks }        
    </div>
  );
}

Nav.propTypes = {
  icon: PropTypes.string
}

Nav.defaultProps = {
  icon: 'fas fa-id-card-alt'
}

export default Nav;
