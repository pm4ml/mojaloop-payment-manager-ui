import { AppUiConfig } from '../App/types';

const setupStyles = (uiConfigurations: AppUiConfig) => {
  setPrimaryColor(uiConfigurations.primaryColor);
  setSecondaryColor(uiConfigurations.secondaryColor);
  setAccentColor(uiConfigurations.accentColor);
};

const setPrimaryColor = (primaryColor: string) => {
  if (primaryColor !== '')
    document.documentElement.style.setProperty('--primary-color', primaryColor);
};

const setSecondaryColor = (secondaryColor: string) => {
  if (secondaryColor !== '')
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
};

const setAccentColor = (accentColor: string) => {
  if (accentColor !== '') document.documentElement.style.setProperty('--accent-color', accentColor);
};

export default setupStyles;
