import React, { FC, useMemo } from 'react';
import { Icon } from 'components';
import './Navbar.css';

type NavbarProps = {
  username?: string;
  logoutUrl?: string;
  activeConnectionName: string;
  activeConnectionStatusColor: string;
  kratos?: boolean;
  countryCode?: string; // Country Code: ZM, UG, RW, MW
};

const Navbar: FC<NavbarProps> = ({
  username,
  activeConnectionName,
  activeConnectionStatusColor,
  logoutUrl,
  kratos,
  countryCode = 'ZM',
}) => {
  // Fetch country logo dynamically
  const countryLogoUrl =
    process.env[`REACT_APP_COUNTRY_LOGO_${countryCode}`] || process.env.REACT_APP_DEFAULT_LOGO;

  // Fetch DFSP Logo dynamically
  const dfspLogoUrl =
    process.env[`REACT_APP_DFSP_LOGO_MTN_${countryCode}`] ||
    process.env.REACT_APP_DEFAULT_DFSP_LOGO;

  // Fetch UI Color dynamically
  const uiColor =
    process.env[`REACT_APP_UI_COLOR_MTN_${countryCode}`] || process.env.REACT_APP_DEFAULT_UI_COLOR;

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
    <div id="navbar" style={{ backgroundColor: uiColor }}>
      <img src={dfspLogoUrl} alt="DFSP Logo" className="navbar__dfsp-logo" />
      <div id="navbar__controls">
        <a id="navbar__link" href="/">
          Payment Manager
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
        <img src={countryLogoUrl} alt="Country Flag" className="navbar__country-logo" />
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
