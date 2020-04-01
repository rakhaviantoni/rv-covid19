import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Title": "Track the Coronavirus disease (COVID-19) by Rakha Viantoni",
      "Desc": "Track the Coronavirus disease (COVID-19) Realtime",
      "search": "Search",
      "cases": "Cases",
      "deaths": "Deaths",
      "active": "Active",
      "recovered": "Recovered",
      "critical": "Critical",
      "CasesOption": "Sort by Cases",
      "TodayCasesOption": "Sort by Today Cases",
      "DeathsOption": "Sort by Deaths",
      "TodayDeathsOption": "Sort by Today Deaths",
      "ActiveOption": "Sort by Active",
      "RecoveredOption": "Sort by Recovered",
      "CriticalOption": "Sort by Critical"
    }
  },
  id: {
    translation: {
      "Title": "Perkembangan Coronavirus disease (COVID-19) oleh Rakha Viantoni",
      "Desc": "Perkembangan the Coronavirus disease (COVID-19) Realtime",
      "search": "Cari",
      "cases": "Kasus",
      "deaths": "Kematian",
      "active": "Aktif",
      "recovered": "Sembuh",
      "critical": "Kritis",
      "CasesOption": "Urut berdasarkan Kasus",
      "TodayCasesOption": "Urut berdasarkan Kasus hari ini",
      "DeathsOption": "Urut berdasarkan Kematian",
      "TodayDeathsOption": "Urut berdasarkan Kematian hari ini",
      "ActiveOption": "Urut berdasarkan Kasus Aktif",
      "RecoveredOption": "Urut berdasarkan Sembuh",
      "CriticalOption": "Urut berdasarkan Kritis"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;