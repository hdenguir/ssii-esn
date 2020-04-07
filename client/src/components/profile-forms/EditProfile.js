import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import {
  createProfile,
  getCurrentProfile
} from '../../actions/profile';

import Spinner from '../layout/Spinner';

const EditProfile = props => {
  const { t } = useTranslation();
  const {
    errors,
    handleSubmit,
    handleChange,
    setFieldValue,
    getCurrentProfile,
    loading,
    values,
    profile
  } = props;

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    showSocialsInputs
  } = values;

  useEffect(() => {
    getCurrentProfile();
  }, [loading, getCurrentProfile]);

  return (
    <>
      {profile.loading && <Spinner />}
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> {t('EditIntro')}
      </p>
      <small>* ={t('required')}</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={e => handleChange(e)}
          >
            <option value="0">*{t('StatusPlaceholder')}</option>
            <option value="Developer">{t('Developer')}</option>
            <option value="Junior Developer">
              {t('JuniorDeveloper')}
            </option>
            <option value="Senior Developer">
              {t('SeniorDeveloper')}
            </option>
            <option value="Manager">{t('Manager')}</option>
            <option value="Student or Learning">
              {t('StudentOrLearning')}
            </option>
            <option value="Instructor">
              {t('InstructorOrTeacher')}
            </option>
            <option value="Intern">{t('Intern')}</option>
            <option value="Other">{t('Other')}</option>
          </select>
          {errors.status && (
            <span className="alert alert-danger">
              {errors.status}
            </span>
          )}
          <small className="form-text">{t('StatusMessage')}</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={t('Company')}
            name="company"
            value={company}
            onChange={e => handleChange(e)}
          />
          {errors.company && (
            <span className="alert alert-danger">
              {errors.company}
            </span>
          )}
          <small className="form-text">{t('CompanyMessage')}</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={t('Website')}
            name="website"
            value={website}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">{t('WebSiteMessage')}</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={t('Location')}
            name="location"
            value={location}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">{t('LocationMessage')}</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={t('Skills')}
            name="skills"
            value={skills}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">{t('SkillsMessage')}</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">{t('GithubMessage')}</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder={t('BioPlaceholder')}
            name="bio"
            value={bio}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">{t('BioMessage')}</small>
        </div>

        <div className="my-2">
          <button
            onClick={() =>
              setFieldValue('showSocialsInputs', !showSocialsInputs)
            }
            type="button"
            className="btn btn-light"
          >
            {t('AddSocialLinks')}
          </button>
          <span>{t('Optional')}</span>
        </div>
        {showSocialsInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => handleChange(e)}
              />
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          {t('GoBack')}
        </Link>
      </form>
    </>
  );
};

const FormProfile = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    if (props.profile.profile != null) {
      const {
        profile: {
          profile: {
            company = '',
            status = '',
            location = '',
            githubusername = '',
            website = '',
            bio = '',
            skills = '',
            social: {
              twitter = '',
              facebook = '',
              linkedin = '',
              youtube = '',
              instagram = ''
            } = {}
          }
        }
      } = props;
      return {
        company,
        website,
        location,
        status,
        skills: skills.join(','),
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
        showSocialsInputs: false
      };
    }
    return {
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      showSocialsInputs: false
    };
  },
  validationSchema: Yup.object().shape({
    company: Yup.string().required('Company is required'),
    status: Yup.string().required('Status is required')
  }),
  handleSubmit: async (values, { setFieldValue, props }) => {
    const {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    } = values;

    const formData = {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    };
    props.createProfile(formData, props.history, true);
  }
})(EditProfile);

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile
})(withRouter(FormProfile));
