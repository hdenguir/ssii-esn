import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Spinner from "../layout/Spinner";

const Register = props => {
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
    isAuthenticated,
    loading
  } = props;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
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
            <span className="alert alert-danger">{errors.name}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={values.email}
            onChange={e => handleChange(e)}
          />
          {errors.email && touched.email && (
            <span className="alert alert-danger">{errors.email}</span>
          )}
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
            <span className="alert alert-danger">{errors.password}</span>
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
            <span className="alert alert-danger">{errors.passwordConfirm}</span>
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
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

const formRegister = withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "Your name is longer than that")
      .required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null])
      .required("Password confirm is required")
  }),
  handleSubmit: async (values, { props, setSubmitting, setFieldValue }) => {
    const { register } = props;

    // Build New User Object
    const { name, email, password } = values;
    const newUser = { name, email, password };

    // Save it
    register(newUser);

    // set Fields
    setSubmitting(false);
  }
})(Register);

// Register.PropTypes = {
//   setAlert: PropTypes.func.isRequired,
//   register: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { setAlert, register })(formRegister);
