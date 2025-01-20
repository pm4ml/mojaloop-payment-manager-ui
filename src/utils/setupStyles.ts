import { AppUiConfig } from '../App/types';

const setupStyles = (uiConfigurations: AppUiConfig) => {
  setPrimaryColor(uiConfigurations.primaryColor);
  setSecondaryColor(uiConfigurations.secondaryColor);
};

const setPrimaryColor = (primaryColor: string) => {
  document.documentElement.style.setProperty('--primary-color', primaryColor);
};

const setSecondaryColor = (secondaryColor: string) => {
  document.documentElement.style.setProperty('--secondary-color', secondaryColor);
};
export default setupStyles;
