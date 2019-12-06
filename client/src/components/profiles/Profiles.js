import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

import Spinner from '../layout/Spinner';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    getProfiles();
  }, [loading, getProfiles]);
  const profilesList =
    profiles.length > 0 &&
    profiles.map(profile => (
      <ProfileItem key={profile._id} profile={profile} />
    ));
  return (
    <Fragment>
      {profiles.length === 0 && loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">{t('Developers')}</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> {t('BrowseDevelopers')}
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profilesList
            ) : (
              <p>{t('NoProfilesFound')} ...</p>
            )}
          </div>
        </>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
