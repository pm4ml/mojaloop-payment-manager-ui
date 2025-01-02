import { Selector } from 'testcafe';

export const Navbar = {
  navbar: Selector('#navbar'),
  connectionDetails: Selector('#navbar__active__connection'),
  username: Selector('#navbar__user__name'),
  logoutButton: Selector('#navbar__logout'),
};
