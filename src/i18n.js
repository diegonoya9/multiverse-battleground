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
    debug: false,
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
            fighters: "Fighters",
            config:"Settings"
          },
          fighterspage: {
            removeFromParty: "Remove from party",
            addToParty: "Add to party",
            setFirst: "Set First",
            back: "Back to Main Menu",
            viewMovements: "View Movements"
          },
          home:{
            welcome:"Welcomeas to the Multiverse Battleground",
            getReady:"Get ready for epic battles!",
            start:"Start Adventure!"
          },
          objectspage:{
            quantity:"Quantity",
            description:"Description"
          },
          settingspage:{
            back:"Back to Main Menu",
            bg:"Background Music volume",
            sound:"Sounds volume",
            sfx:"SFX volume",
            save:"Save changes"
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
            fighters: "Luchadores",
            config:"Opciones"
          },
          fighterspage: {
            removeFromParty: "Quitar del equipo",
            addToParty: "Agregar al equipo",
            setFirst: "Seleccionar primero",
            back: "Volver al Menú Principal",
            viewMovements: "Ver Ataques"
          },
          home:{
            welcome:"Bienvenido al Multiverse Battleground",
            getReady:"Preparate para batallas épicas!!",
            start:"Empezar Aventura!"
          },
          objectspage:{
            quantity:"Cantidad",
            description:"Descripción"
          },
          settingspage:{
            back:"Volver al Menú Principal",
            bg:"Volúmen de Música de ambiente",
            sound:"Volúmen de sonidos de interfaz",
            sfx:"Volúmen de Efectos Especiales",
            save:"Guardar cambios"
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
