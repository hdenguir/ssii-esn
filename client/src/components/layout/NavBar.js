import React from 'react';
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
          <i className="fas fa-home" />
          <span className="hide-sm">{t('Dashboard')}</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-blog" />
          <span className="hide-sm">{t('Posts')}</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fas fa-users" />{' '}
          <span className="hide-sm">{t('Profiles')}</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">{t('Logout')}</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-users" /> {t('Developers')}
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i className="fas fa-user-plus" /> {t('Register')}
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-in-alt" /> {t('Login')}
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> ESN & SSII
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      <ul>
        <li>
          <select
            name="status"
            value={i18n.language}
            onChange={e => changeLanguage(e)}
          >
            <option value="fr-FR">FR</option>
            <option value="en-US">EN</option>
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
