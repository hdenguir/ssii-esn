import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { updateProfile } from '../../actions/profile';

const AddExperience = props => {
  const { t } = useTranslation();
  const {
    values: {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    },
    handleSubmit,
    handleChange,
    touched,
    errors,
  } = props;
  return (
    <>
      <h1 className="large text-primary">{t('AddExperience')}</h1>
      <p className="lead">
        <i className="fas fa-code-branch" />
        {t('AddExperienceIntro')}
      </p>
      <small>* ={t('required')}</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder={t('JobTitle')}
            name="title"
            value={title}
            onChange={e => handleChange(e)}
          />
          {errors.title && touched.title && (
            <span className="alert alert-danger">
              {t(errors.title)}
            </span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={t('Company')}
            name="company"
            value={company}
            onChange={e => handleChange(e)}
          />
          {errors.company && touched.company && (
            <span className="alert alert-danger">
              {t(errors.company)}
            </span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>{t('FromDate')}</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => handleChange(e)}
          />
          {errors.from && touched.from && (
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
            Current
          </p>
        </div>
        <div className="form-group">
          <h4>{t('ToDate')}</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => handleChange(e)}
          />
          {errors.to && touched.to && (
            <span className="alert alert-danger">{t(errors.to)}</span>
          )}
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder={t('JobDescription')}
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
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is required'),
    company: Yup.string().required('Company is required'),
    from: Yup.date().required('From is required'),
    to: Yup.date().when(
      'from',
      (from, schema) =>
        from &&
        schema.min(from, `Please enter a date greater than: ${from}.`)
    ),
  }),
  handleSubmit: async (
    values,
    { setSubmitting, setFieldValue, props }
  ) => {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = values;
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    props.updateProfile(newExperience, props.history, 'Experience');
  },
})(AddExperience);

AddExperience.propTypes = {
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(
  withRouter(FormExperience)
);
