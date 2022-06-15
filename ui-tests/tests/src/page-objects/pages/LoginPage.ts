import { Selector } from "testcafe";

export const LoginPage = {
  usernameField: Selector('#username', { timeout: 25000 }),
  passwordField: Selector('#password', { timeout: 25000 }),
  loginButton: Selector('.pf-c-button', { timeout: 25000 }),
};
