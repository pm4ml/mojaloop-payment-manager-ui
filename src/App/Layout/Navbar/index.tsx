/* eslint-disable max-len */
import React, { FC, useMemo } from 'react';
import { Icon } from 'components';
import './Navbar.scss';

type NavbarProps = {
  username?: string;
  logoutUrl?: string;
  activeConnectionName: string;
  activeConnectionStatusColor: string;
  kratos?: boolean;
};

const Navbar: FC<NavbarProps> = ({
  username,
  activeConnectionName,
  activeConnectionStatusColor,
  logoutUrl,
  kratos,
}) => {
  const dfspSubtitle = process.env.REACT_APP_SUBTITLE || 'CBC';
  const countryLogo = process.env.REACT_APP_COUNTRY_LOGO || '/Comesa-logo.png';
  const dfspLogo = process.env.REACT_APP_DFSP_LOGO || '/cbs_logo.jpg';
  const navbarColor = process.env.REACT_APP_SECONDARY_COLOR || '#02182b';

  document.documentElement.style.setProperty('--navbarColor', navbarColor);

  const clickFunc = () => {
    if (logoutUrl) {
      if (kratos) {
        fetch(`${logoutUrl}`, {
          headers: {
            accept: 'application/json',
          },
        })
          .then((response) => response.json())
          .then(({ logout_url }) => {
            if (logout_url) window.location.assign(logout_url);
          });
      } else window.location.href = logoutUrl;
    }
  };

  return (
    <div id="navbar" style={{ backgroundColor: navbarColor }}>
      <img src={dfspLogo} alt="DFSP Logo" className="navbar__dfsp-logo" />
      <div id="navbar__controls">
        <a id="navbar__link" href="/">
          {dfspSubtitle} Payment Manager
        </a>
      </div>
      <div id="navbar__active__connection">
        Connected to: {activeConnectionName}
        <div
          className="navbar__connection-led"
          style={{ backgroundColor: activeConnectionStatusColor }}
        />
      </div>
      <div id="navbar__user">
        <img src={countryLogo} alt="Country Flag" className="navbar__country-logo" />
        <div id="navbar__user__icon">
          <Icon name="user-small" fill="#fff" />
        </div>
        <div id="navbar__user__name">{username || ''}</div>
      </div>
      <div id="navbar__logout" role="button" tabIndex={0} onClick={clickFunc} onKeyUp={clickFunc}>
        Logout
      </div>
    </div>
  );
};

export default Navbar;
