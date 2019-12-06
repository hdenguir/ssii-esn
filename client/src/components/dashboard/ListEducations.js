import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ListEducations = ({ education, deleteEducation }) => {
  const { t, i18n } = useTranslation();
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>
        {edu.school} - {edu.id}
      </td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">{edu.fieldofstudy}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id, 'Education')}
        >
          {t('Delete')}
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">{t('EducationCredentials')}</h2>
      {education.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>{t('School')}</th>
              <th className="hide-sm">{t('Degree')}</th>
              <th className="hide-sm">{t('FieldOfStudy')}</th>
              <th className="hide-sm">{t('Years')}</th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      ) : (
        <p>{t('NoEducation')} !!!</p>
      )}
    </Fragment>
  );
};

ListEducations.propTypes = {
  education: PropTypes.array.isRequired
};

export default ListEducations;
