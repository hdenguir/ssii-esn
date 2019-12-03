import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ values, errors, touched, handleSubmit, handleChange }) => {
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={e => handleSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={values.text}
          onChange={e => handleChange(e)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
        {errors.text && touched.text && (
          <span className="alert alert-danger">{errors.text}</span>
        )}
      </form>
    </div>
  );
};

const FormPost = withFormik({
  mapPropsToValues: () => ({
    text: ""
  }),
  validationSchema: Yup.object().shape({
    text: Yup.string().required("Text is required")
  }),
  handleSubmit: async (
    values,
    { setSubmitting, setFieldValue, resetForm, props }
  ) => {
    const { text } = values;
    const newPost = { text };
    props.addPost(newPost);
    resetForm();
  }
})(PostForm);

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(FormPost);
