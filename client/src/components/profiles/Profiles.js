import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getProfiles } from '../../actions/profile';

import Pagination from '../layout/Pagination';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

const Profiles = ({ getProfiles, profile }) => {
  const { t } = useTranslation();
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const { profiles, loading } = profile;
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const handlePageChange = page => setCurrentPage(page);

  if (profile != null && profiles.length === 0 && loading)
    return <Spinner />;
  const index = (currentPage - 1) * pageSize;
  const nextIndex = pageSize * currentPage;

  return (
    <>
      <h1 className="large text-primary">{t('Developers')}</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop" />
        {t('BrowseDevelopers')}
      </p>
      {!!profiles.length && (
        <Pagination
          total={profiles.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
      <div className="profiles">
        {profiles.slice(index, nextIndex).map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))}
      </div>
      {!!profiles.length && (
        <Pagination
          total={profiles.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
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
