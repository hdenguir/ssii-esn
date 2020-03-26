import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" />
        {' '}
        {t('PageNotFound')}
      </h1>
      <p className="large">{t('PageNotFoundSorry')}</p>
    </>
  );
};

export default NotFound;
