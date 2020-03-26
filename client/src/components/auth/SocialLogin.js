import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loginSocial } from '../../actions/auth';

const SocialLogin = ({ loginSocial }) => {
  const [t] = useTranslation();
  const responseGoogle = response => {
    const { googleId, name, email, imageUrl } = response.profileObj;
    const user = {
      password: googleId,
      name,
      email,
      imageUrl
    };
    loginSocial(user);
  };

  const responseFacebook = response => {
    const {
      id,
      name,
      email,
      picture: {
        data: { url }
      }
    } = response;
    const user = {
      password: id,
      name,
      email,
      imageUrl: url
    };

    loginSocial(user);
  };
  return (
    <>
      <h3>{t('LoginWith')}</h3>
      <GoogleLogin
        clientId="788364508094-fcvkdlokaji9hgbk30qmuco108rv0bku.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
          <button
            className="btn btn-raised btn-danger"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Google
          </button>
        )}
      />{' '}
      <FacebookLogin
        appId="978561239190799"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        render={renderProps => (
          <button
            className="btn btn-raised btn-primary"
            onClick={renderProps.onClick}
          >
            Facebook
          </button>
        )}
      />
    </>
  );
};

export default connect(null, { loginSocial })(SocialLogin);
