import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ProfileAbout = ({
  profile: {
    user: { name },
    bio,
    skills,
  },
}) => {
  const { t } = useTranslation();
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">
        {name.split(' ')[0]}
        's Bio
      </h2>
      <p>{bio}</p>
      <div className="line" />
      <h2 className="text-primary">{t('SkillSet')}</h2>
      <div className="skills">
        {skills
          && skills.map((skill, index) => (
            <div key={index} className="p-1">
              <i className="fas fa-check" />
              {' '}
              {skill}
            </div>
          ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
