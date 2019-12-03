import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/profile";

import { withFormik } from "formik";
import * as Yup from "yup";

const AddEducation = props => {
  const {
    values: { school, degree, fieldofstudy, from, to, current, description },
    handleSubmit,
    handleChange,
    errors
  } = props;
  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={e => handleChange(e)}
          />
          {errors.school && (
            <span className="alert alert-danger">{errors.school}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => handleChange(e)}
          />
          {errors.degree && (
            <span className="alert alert-danger">{errors.degree}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
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
            <span className="alert alert-danger">{errors.from}</span>
          )}
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={e => handleChange(e)}
            />{" "}
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
            placeholder="Program Description"
            value={description}
            onChange={e => handleChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

const FormExperience = withFormik({
  mapPropsToValues: () => ({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  }),
  validationSchema: Yup.object().shape({
    school: Yup.string().required("School is required"),
    degree: Yup.string().required("Degree is required"),
    fieldofstudy: Yup.string().required("Field of study is required"),
    from: Yup.string().required("From is required")
  }),
  handleSubmit: async (values, { setSubmitting, setFieldValue, props }) => {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = values;
    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    props.updateProfile(newEducation, props.history, "Education");
  }
})(AddEducation);

AddEducation.propTypes = {
  updateProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateProfile }
)(withRouter(FormExperience));
