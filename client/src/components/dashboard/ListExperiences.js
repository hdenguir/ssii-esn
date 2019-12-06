import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { useTranslation } from 'react-i18next';

const ListExperiences = ({ experience, deleteExperience }) => {
  const { t, i18n } = useTranslation();

  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(exp._id, 'Experience')}
        >
          {t('Delete')}
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">{t('ExperienceCredentials')}</h2>
      {experience.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>{t('Company')}</th>
              <th className="hide-sm">{t('Title')}</th>
              <th className="hide-sm">{t('Years')}</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      ) : (
        <p>{t('NoExperience')} !!!</p>
      )}
    </Fragment>
  );
};

ListExperiences.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ListExperiences;
