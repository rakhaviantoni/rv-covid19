import React from 'react';
import { withTranslation } from 'react-i18next';

function Critical({ t, i18n }) {
  return <>{t('critical')}</>
}

export default withTranslation()(Critical);