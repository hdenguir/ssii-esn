import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import { connect } from 'react-redux';

import * as Yup from 'yup';
import { login } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import SocialLogin from './SocialLogin';

Yup.setLocale({
  mixed: { required: 'required' },
  string: { min: 'minlength', email: 'email' }
});

const Login = ({
  values,
  handleSubmit,
  handleChange,
  errors,
  touched,
  isAuthenticated,
  loading
}) => {
  const { t } = useTranslation();

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  if (loading) return <Spinner />;

  return (
    <>
      <h1 className="large text-primary">{t('Login')}</h1>
      <p className="lead">
        <i className="fas fa-user" /> {t('SignInAccount')}
      </p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
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
              {t(errors.password, { min: '6' })}
            </span>
          )}
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value={t('Login')}
        />
      </form>

      <div className="lead my">
        <hr />
        <SocialLogin />
      </div>

      <p className="my-1">
        {t('DontAccount')} <Link to="/register">{t('SignUp')}</Link>
      </p>
    </>
  );
};

const loginForm = withFormik({
  mapPropsToValues: () => ({
    email: 'demo@gmail.com',
    password: 'test123'
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required()
  }),
  handleSubmit: async (
    values,
    { setSubmitting, setFieldValue, props }
  ) => {
    const { email, password } = values;
    props.login({ email, password });
  }
})(Login);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { login })(loginForm);
