import React from 'react';
import { withTranslation } from 'react-i18next';

function Cases({ t, i18n }) {
  return <>{t('cases')}</>
}

export default withTranslation()(Cases);