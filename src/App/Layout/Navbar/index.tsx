import React, { FC } from 'react';
import { Icon } from 'components';
import './Navbar.css';

type NavbarProps = {
  username?: string;
  logoutUrl?: string;
  activeConnectionName: string;
  activeConnectionStatusColor: string;
  kratos?: boolean;
  appTitle: string;
  appLogo: string;
  countryLogo: string;
};

const Navbar: FC<NavbarProps> = ({
  username,
  activeConnectionName,
  activeConnectionStatusColor,
  logoutUrl,
  kratos,
  appTitle,
  appLogo,
  countryLogo,
}) => {
  const handleLogout = () => {
    if (logoutUrl) {
      if (kratos) {
        fetch(logoutUrl, {
          headers: { accept: 'application/json' },
        })
          .then((response) => response.json())
          .then(({ logout_url }) => {
            if (logout_url) window.location.assign(logout_url);
          });
      } else {
        window.location.href = logoutUrl;
      }
    }
  };

  return (
    <div id="navbar">
      {appLogo ? <img src={appLogo} alt="DFSP Logo" className="navbar__dfsp-logo" /> : null}

      <div id="navbar__controls">
        <a id="navbar__link" href="/">
          {appTitle} Payment Manager
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
        {countryLogo ? (
          <img src={countryLogo} alt="Country Flag" className="navbar__country-logo" />
        ) : null}

        <div id="navbar__user__icon">
          <Icon name="user-small" fill="#fff" />
        </div>
        <div id="navbar__user__name">{username || ''}</div>
      </div>

      <div
        id="navbar__logout"
        role="button"
        tabIndex={0}
        onClick={handleLogout}
        onKeyUp={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default Navbar;
