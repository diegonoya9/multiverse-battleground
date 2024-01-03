import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          multiverse: {
            fight: 'Fight',
            welcome: 'Welcome',
            money: 'You have',
            bag: "Bag",
            shop: "Shop",
            users: "Users",
            fighters: "Fighters"
          }
        }
      },
      es: {
        translation: {
          multiverse: {
            fight: 'A pelear',
            welcome: 'Hola',
            money: 'Tienes',
            bag: "Mochila",
            shop: "Tienda",
            users: "Usuarios",
            fighters: "Luchadores"
          }
        }
      },
    }
  });
/*i18n.changeLanguage('es')
  .then(() => {
    console.log('Idioma cambiado a inglés');
    // Puedes realizar acciones adicionales después de cambiar el idioma si es necesario
  })
  .catch(error => {
    console.error('Error al cambiar el idioma', error);
  });*/
export default i18n;
