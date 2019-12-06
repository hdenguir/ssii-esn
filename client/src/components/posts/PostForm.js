import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { useTranslation } from 'react-i18next';

Yup.setLocale({
  mixed: {
    required: 'required'
  }
});

const PostForm = ({ values, errors, touched, handleSubmit, handleChange }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>{t('SaySomething')}...</h3>
      </div>
      <form className="form my-1" onSubmit={e => handleSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder={t('CreatePost')}
          value={values.text}
          onChange={e => handleChange(e)}
        ></textarea>
        <input
          type="submit"
          className="btn btn-dark my-1"
          value={t('Submit')}
        />
        {errors.text && touched.text && (
          <span className="alert alert-danger">{t(errors.text)}</span>
        )}
      </form>
    </div>
  );
};

const FormPost = withFormik({
  mapPropsToValues: () => ({
    text: ''
  }),
  validationSchema: Yup.object().shape({
    text: Yup.string().required()
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
