import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

// import PropTypes from "prop-types";

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Spinner from '../layout/Spinner';

Yup.setLocale({
  mixed: {
    required: 'required',
    oneOf: 'equalTo',
  },
  string: {
    min: 'minlength',
    email: 'email',
  },
});
const Register = props => {
  const { t } = useTranslation();
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
    isAuthenticated,
    loading,
  } = props;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="large text-primary">{t('SignUp')}</h1>
      <p className="lead">
        <i className="fas fa-user" /> {t('CreateAccount')}
      </p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={e => handleChange(e)}
          />
          {errors.name && touched.name && (
            <span className="alert alert-danger">
              {t(errors.name, { min: 3 })}
            </span>
          )}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder={t('EmailAddress')}
            name="email"
            value={values.email}
            onChange={e => handleChange(e)}
          />
          {errors.email && touched.email && (
            <span className="alert alert-danger">
              {t(errors.email)}
            </span>
          )}
          <small className="form-text">{t('AvatarMessage')}</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={e => handleChange(e)}
          />

          {errors.password && touched.password && (
            <span className="alert alert-danger">
              {t(errors.password, { min: 6 })}
            </span>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={e => handleChange(e)}
          />
          {errors.passwordConfirm && touched.passwordConfirm && (
            <span className="alert alert-danger">
              {t(errors.passwordConfirm, { min: 6 })}
            </span>
          )}
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Register"
          disabled={isSubmitting}
        />
      </form>
      <p className="my-1">
        {t('HaveAccount')} <Link to="/login">{t('Login')}</Link>
      </p>
    </>
  );
};

const formRegister = withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3)
      .required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
    passwordConfirm: Yup.string()
      .min(6)
      .oneOf([Yup.ref('password'), null])
      .required(), // 'Password confirm is required'
  }),
  handleSubmit: async (
    values,
    { props, setSubmitting, setFieldValue }
  ) => {
    const { register } = props;

    // Build New User Object
    const { name, email, password } = values;
    const newUser = { name, email, password };

    // Save it
    register(newUser);

    // set Fields
    setSubmitting(false);
  },
})(Register);

// Register.PropTypes = {
//   setAlert: PropTypes.func.isRequired,
//   register: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { setAlert, register })(
  formRegister
);
