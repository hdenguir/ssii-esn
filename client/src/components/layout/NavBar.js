import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { logout } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = e => {
    i18n.changeLanguage(e.target.value);
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">{t('Dashboard')}</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-user"></i> <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Profiles</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">{t('Developers')}</Link>
      </li>
      <li>
        <Link to="/register">{t('Register')}</Link>
      </li>
      <li>
        <Link to="/login">{t('Login')}</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> MySocialy
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
      <ul>
        <li>
          <select name="status" onChange={e => changeLanguage(e)}>
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);
