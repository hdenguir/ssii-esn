import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { updateProfilePhoto } from '../../actions/profile';

const UpdatePhoto = props => {
  const { t } = useTranslation();
  const {
    values: { photo },
    setFieldValue,
    handleSubmit,
    errors
  } = props;
  return (
    <>
      <h1 className="large text-primary">{t('AddPhoto')}</h1>
      <small>* ={t('required')}</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="file"
            placeholder={t('AddPhoto')}
            name="photo"
            //value={photo}
            onChange={e => {
              setFieldValue('photo', e.target.files[0]);
            }}
          />
          {errors.photo && (
            <span className="alert alert-danger">{errors.photo}</span>
          )}
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1"
          value={t('Submit')}
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          {t('GoBack')}
        </Link>
      </form>
    </>
  );
};

const FormUpdatePhoto = withFormik({
  mapPropsToValues: () => ({ photo: '' }),
  validationSchema: Yup.object().shape({
    //photo: Yup.string().required()
  }),
  handleSubmit: async (values, { props }) => {
    const formData = new FormData();
    formData.append('photo', values.photo);
    props.updateProfilePhoto(formData, props.history);
  }
})(UpdatePhoto);

UpdatePhoto.propTypes = {
  updateProfilePhoto: PropTypes.func.isRequired
};

export default connect(null, { updateProfilePhoto })(
  withRouter(FormUpdatePhoto)
);
