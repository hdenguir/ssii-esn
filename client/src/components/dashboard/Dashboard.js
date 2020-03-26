import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Spinner from '../layout/Spinner';

import {
  getCurrentProfile,
  deleteProfileItem,
  deleteAcount
} from '../../actions/profile';

import DashboardActions from './DashboardActions';
import ListExperiences from './ListExperiences';
import ListEducations from './ListEducations';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteProfileItem,
  deleteAcount
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (loading && profile === null) return <Spinner />;

  return (
    <>
      <h1 className="large text-primary">{t('Dashboard')}</h1>
      <p className="lead">
        <i className="fas fa-user" /> {t('Welcome')}{' '}
        <strong>
          {user && user.name && user.name.toUpperCase()}
        </strong>
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <ListExperiences
            deleteExperience={deleteProfileItem}
            experience={profile && profile.experience}
          />
          <ListEducations
            deleteEducation={deleteProfileItem}
            education={profile && profile.education}
          />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => deleteAcount()}
            >
              <i className="fas fa-user-minus" /> {t('DeleteAccount')}
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{t('YetProfile')}</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            {t('CreateProfile')}
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProfileItem: PropTypes.func.isRequired,
  deleteAcount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteProfileItem,
  deleteAcount
})(Dashboard);
