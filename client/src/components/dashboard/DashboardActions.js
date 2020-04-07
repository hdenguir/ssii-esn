import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DashboardActions = () => {
  const { t } = useTranslation();
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" />{' '}
        {t('EditProfile')}
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary" />{' '}
        {t('AddExperience')}
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary" />{' '}
        {t('AddEducation')}
      </Link>
      <Link to="/profile/photo/edit" className="btn btn-light">
        <i className="fas fa-camera text-primary" /> {t('AddPhoto')}
      </Link>
    </div>
  );
};

export default DashboardActions;
