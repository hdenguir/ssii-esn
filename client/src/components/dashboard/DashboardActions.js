import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const DashboardActions = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> {t('EditProfile')}
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> {t('AddExperience')}
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i>{' '}
        {t('AddEducation')}
      </Link>
    </div>
  );
};

export default DashboardActions;
