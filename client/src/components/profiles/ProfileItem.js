import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <>
      <div className="profile bg-light">
        <img className="round-img" src={avatar} alt="" />
        <div>
          <h2>{name}</h2>
          <p>
            {status} at {company}
          </p>
          <p>{location}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>

        <ul>
          {skills &&
            skills.map((skill, index) => (
              <li key={index} className="text-primary">
                <i className="fas fa-check"></i> {skill}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
