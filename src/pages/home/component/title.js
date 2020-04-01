import React from 'react';
import { withTranslation } from 'react-i18next';

function Title({ t, i18n }) {
  return <>{t('Title')}</>
}

export default withTranslation()(Title);