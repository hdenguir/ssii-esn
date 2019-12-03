import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

import {
  getCurrentProfile,
  deleteProfileItem,
  deleteAcount
} from "../../actions/profile";

import DashboardActions from "./DashboardActions";
import ListExperiences from "./ListExperiences";
import ListEducations from "./ListEducations";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteProfileItem,
  deleteAcount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [loading, getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {" "}
        <i className="fas fa-user"></i> Welcome{" "}
        <strong>{user && user.name.toUpperCase()}</strong>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <ListExperiences
            deleteExperience={deleteProfileItem}
            experience={profile.experience}
          />
          <ListEducations
            deleteEducation={deleteProfileItem}
            education={profile.education}
          />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAcount()}>
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some infos</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
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
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteProfileItem, deleteAcount }
)(Dashboard);
