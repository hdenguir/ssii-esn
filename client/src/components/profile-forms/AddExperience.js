import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/profile";

import { withFormik } from "formik";
import * as Yup from "yup";

const AddExperience = props => {
  const {
    values: { title, company, location, from, to, current, description },
    handleSubmit,
    handleChange,
    errors
  } = props;
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={e => handleChange(e)}
          />
          {errors.title && (
            <span className="alert alert-danger">{errors.title}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={e => handleChange(e)}
          />
          {errors.company && (
            <span className="alert alert-danger">{errors.company}</span>
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
            Current Job
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
            placeholder="Job Description"
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
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Title is required"),
    company: Yup.string().required("Company is required"),
    from: Yup.string().required("From is required")
  }),
  handleSubmit: async (values, { setSubmitting, setFieldValue, props }) => {
    const { title, company, location, from, to, current, description } = values;
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    props.updateProfile(newExperience, props.history, "Experience");
  }
})(AddExperience);

AddExperience.propTypes = {
  updateProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateProfile }
)(withRouter(FormExperience));
