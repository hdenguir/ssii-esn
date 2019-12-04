import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import Spinner from "../layout/Spinner";

const Login = props => {
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
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
            type="email"
            placeholder="Email Address"
            name="email"
            value={values.email}
            onChange={e => handleChange(e)}
          />
          {errors.email && touched.email && (
            <span className="alert alert-danger">{errors.email}</span>
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
            <span className="alert alert-danger">{errors.password}</span>
          )}
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>

      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

const loginForm = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    showAlert: false,
    error: null
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Your password is longer than that")
      .required("Password is required")
  }),
  handleSubmit: async (values, { setSubmitting, setFieldValue, props }) => {
    const { email, password } = values;
    const user = { email, password };
    props.login(user);
  }
})(Login);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { login })(loginForm);
