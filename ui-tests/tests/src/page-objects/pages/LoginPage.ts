import { Selector } from "testcafe";

export const LoginPage = {
  usernameField: Selector('#username'),
  passwordField: Selector('#password'),
  loginButton: Selector('.pf-c-button'),
};
