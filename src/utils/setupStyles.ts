import { AppUiConfig } from '../App/types';

const setupStyles = (uiConfigurations: AppUiConfig) => {
  setPrimaryColor(uiConfigurations.primaryColor);
  setSecondaryColor(uiConfigurations.secondaryColor);
  setAccentColor(uiConfigurations.accentColor);
  // setNavbarColor(uiConfigurations.secondaryColor);
};

const setPrimaryColor = (primaryColor: string) => {
  document.documentElement.style.setProperty('--primary-color', primaryColor);
};

const setSecondaryColor = (secondaryColor: string) => {
  document.documentElement.style.setProperty('--secondary-color', secondaryColor);
};

const setAccentColor = (accentColor: string) => {
  document.documentElement.style.setProperty('--accent-color', accentColor);
};

// const setNavbarColor = (navbarColor: string) => {
//   document.documentElement.style.setProperty('--navbar-color', navbarColor);
// };

export default setupStyles;
