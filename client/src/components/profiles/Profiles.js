import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

import Spinner from "../layout/Spinner";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [loading, getProfiles]);
  const profilesList =
    profiles.length &&
    profiles.map(profile => (
      <ProfileItem key={profile._id} profile={profile} />
    ));
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length ? profilesList : <p>No profiles found ...</p>}
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
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
