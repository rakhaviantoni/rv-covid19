import React from 'react';
import { withTranslation } from 'react-i18next';

function Recovered({ t, i18n }) {
  return <>{t('recovered')}</>
}

export default withTranslation()(Recovered);