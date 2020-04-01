import React from 'react';
import { withTranslation } from 'react-i18next';

function Deaths({ t, i18n }) {
  return <>{t('deaths')}</>
}

export default withTranslation()(Deaths);