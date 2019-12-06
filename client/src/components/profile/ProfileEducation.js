import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { useTranslation } from 'react-i18next';

const ProfileEducation = ({ profile: { education } }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">{t('EducationCredentials')}</h2>
      {education.length ? (
        education.map(edu => (
          <div key={edu._id}>
            <h3>{edu.school}</h3>
            <p>
              <Moment format="MMM YYYY">{edu.from}</Moment> -{' '}
              <Moment format="MMM YYYY">{edu.to}</Moment>
            </p>
            <p>
              <strong>{t('Degree')}: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>{t('FieldOfStudy')}: </strong>
              {edu.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          </div>
        ))
      ) : (
        <p>{t('NoEducation')} !!!</p>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileEducation;
