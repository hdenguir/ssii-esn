import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { updateProfile } from '../../actions/profile';

const AddEducation = props => {
  const { t } = useTranslation();
  const {
    values: {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    },
    handleSubmit,
    handleChange,
    errors,
  } = props;
  return (
    <>
      <h1 className="large text-primary">{t('AddEducation')}</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap" />
        {t('AddEducationIntro')}
      </p>
      <small>* ={t('required')}</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder={t('SchoolOrBootcamp')}
            name="school"
            value={school}
            onChange={e => handleChange(e)}
          />
          {errors.school && (
            <span className="alert alert-danger">
              {t(errors.school)}
            </span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={t('DegreeOrCertificate')}
            name="degree"
            value={degree}
            onChange={e => handleChange(e)}
          />
          {errors.degree && (
            <span className="alert alert-danger">
              {t(errors.degree)}
            </span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={t('FieldOfStudy')}
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => handleChange(e)}
          />
          {errors.from && (
            <span className="alert alert-danger">
              {t(errors.from)}
            </span>
          )}
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={e => handleChange(e)}
            />{' '}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder={t('ProgramDescription')}
            value={description}
            onChange={e => handleChange(e)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1"
          value={t('Submit')}
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          {t('GoBack')}
        </Link>
      </form>
    </>
  );
};

const FormExperience = withFormik({
  mapPropsToValues: () => ({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  }),
  validationSchema: Yup.object().shape({
    school: Yup.string().required(),
    degree: Yup.string().required(),
    fieldofstudy: Yup.string().required(),
    from: Yup.string().required(),
  }),
  handleSubmit: async (
    values,
    { setSubmitting, setFieldValue, props }
  ) => {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = values;
    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    props.updateProfile(newEducation, props.history, 'Education');
  },
})(AddEducation);

AddEducation.propTypes = {
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(
  withRouter(FormExperience)
);
