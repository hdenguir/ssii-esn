import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { addComment, deleteComment } from "../../actions/post";

const CommentForm = ({
  values,
  errors,
  touched,
  handleSubmit,
  handleChange
}) => {
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={e => handleSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
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

const FormComment = withFormik({
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
    const { postId, addComment } = props;
    const { text } = values;
    const newComment = { text };
    addComment(postId, newComment);
    resetForm();
  }
})(CommentForm);

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment, deleteComment }
)(FormComment);
