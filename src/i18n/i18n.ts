import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
			'title': 'Game-Rewinder',
			'library': 'Library',
			'settings': 'Settings',
			'about': 'About',
			'save.time': 'Time',
			'save.description': 'Description',
    }
  },
  'zh': {
    translation: {
      'title': '游戏倒带机',
			'library': '游戏库',
			'settings': '设置',
			'about': '关于',
			'save.time': '存档时间',
			'save.description': '存档描述',
    }
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'zh', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
console.log(i18n.t('title'));