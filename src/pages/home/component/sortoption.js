import React from 'react';
import { withTranslation } from 'react-i18next';

function SortOption({ t, i18n }) {
  return <>
  <option value="cases">{t('CasesOption')}</option>
  <option value="todayCases">{t('TodayCasesOption')}</option>
  <option value="deaths">{t('DeathsOption')}</option>
  <option value="todayDeaths">{t('TodayDeathsOption')}</option>
  <option value="recovered">{t('RecoveredOption')}</option>
  <option value="active">{t('ActiveOption')}</option>
  <option value="critical">{t('CriticalOption')}</option></>
}

export default withTranslation()(SortOption);