import React, { FC } from 'react';
import { Icon } from 'components';
import './Navbar.css';

type Navbar = {
  username?: string;
  logoutUrl?: string;
  activeConnectionName: string;
  activeConnectionStatusColor: string;
  kratos?: boolean;
};

const Navbar: FC<Navbar> = ({
  username,
  activeConnectionName,
  activeConnectionStatusColor,
  logoutUrl,
  kratos,
}) => {
  const clickFunc = () => {
    if (logoutUrl) {
      if (kratos) {
        fetch(`${logoutUrl}?return_to=${window.location.href}`, {
          headers: {
            accept: 'application/json',
          },
        })
          .then((response) => response.json())
          .then(({ logout_url }) => {
            window.location.assign(logout_url);
          });
      } else window.location.href = logoutUrl;
    }
  };

  return (
    <div id="navbar">
      <div id="navbar__controls">
        <a id="navbar__link" href="/">
          Payment Manager
        </a>
      </div>
      <div id="navbar__active__connection">
        Connected to: {activeConnectionName}
        <div
          className="navbar__connection-led"
          style={{ background: activeConnectionStatusColor }}
        />
      </div>
      <div id="navbar__user">
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
