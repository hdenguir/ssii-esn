import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    user: { name, avatar },
    company,
    status,
    location,
    githubusername,
    website,
    social: {
      twitter = '',
      facebook = '',
      linkedin = '',
      youtube = '',
      instagram = ''
    } = {}
  }
}) => (
  <div className="profile-top bg-primary p-1">
    <img className="round-img my-1" src={avatar} alt="" />
    <h1 className="large">{name}</h1>
    <p className="lead">
      {status} at {company}
    </p>
    <p>{location}</p>
    <div className="icons my-1">
      {website && (
        <a href={website} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-globe fa-2x" />
        </a>
      )}
      {twitter !== 'undefined' && (
        <a href={twitter} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter fa-2x" />
        </a>
      )}
      {facebook && (
        <a href={facebook} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook fa-2x" />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin fa-2x" />
        </a>
      )}
      {youtube && (
        <a href={youtube} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-youtube fa-2x" />
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram fa-2x" />
        </a>
      )}
    </div>
  </div>
);

ProfileTop.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileTop;
