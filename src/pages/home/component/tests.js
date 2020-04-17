import React from 'react';
import { withTranslation } from 'react-i18next';

function Tests({ t, i18n }) {
  return <>{t('tests')}</>
}

export default withTranslation()(Tests);