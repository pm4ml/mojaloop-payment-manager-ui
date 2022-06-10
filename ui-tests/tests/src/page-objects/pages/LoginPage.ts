import { Selector } from "testcafe";

export const LoginPage = {
  usernameField: Selector('#username', { timeout: 20000 }),
  passwordField: Selector('#password', { timeout: 20000 }),
  loginButton: Selector('.pf-c-button', { timeout: 20000 }),
};
