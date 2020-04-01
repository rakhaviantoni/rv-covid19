import React from 'react';
import { withTranslation } from 'react-i18next';

function Active({ t, i18n }) {
  return <>{t('active')}</>
}

export default withTranslation()(Active);