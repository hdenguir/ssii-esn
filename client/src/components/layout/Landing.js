import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Landing = ({ isAuthenticated }) => {
  const { t } = useTranslation();
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">ESN & SSII</h1>
          <p className="lead">{t('welcomeMessage')}</p>
          <div className="buttons">
            <Link to="/login" className="btn btn-light">
              {t('Login')}
            </Link>
            <Link to="/register" className="btn btn-primary">
              {t('SignUp')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
