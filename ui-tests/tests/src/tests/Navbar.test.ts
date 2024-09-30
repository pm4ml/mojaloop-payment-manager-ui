import { config } from '../config';
import { LoginPage } from '../page-objects/pages/LoginPage';
import { Navbar } from '../page-objects/components/Navbar';

fixture `Navbar Feature`
  .page`${config.pm4mlEndpoint}/transfer`;

test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Name renders correctly when user has first/last name', async (t) => {
  await t.typeText(LoginPage.usernameField, config.credentials.test.username)
  await t.typeText(LoginPage.passwordField, config.credentials.test.password)
  await t.click(LoginPage.loginButton)
  await t.expect(Navbar.username.innerText).eql('test test')
});

test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Name renders correctly when user has no first name', async (t) => {
  await t.typeText(LoginPage.usernameField, config.credentials.nofirstname.username)
  await t.typeText(LoginPage.passwordField, config.credentials.nofirstname.password)
  await t.click(LoginPage.loginButton)
  await t.expect(Navbar.username.innerText).eql('last')
});

test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Name renders correctly when user has no last name', async (t) => {
  await t.typeText(LoginPage.usernameField, config.credentials.nolastname.username)
  await t.typeText(LoginPage.passwordField, config.credentials.nolastname.password)
  await t.click(LoginPage.loginButton)
  await t.expect(Navbar.username.innerText).eql('first')
});

test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Name renders correctly when user has no name populated', async (t) => {
  await t.typeText(LoginPage.usernameField, config.credentials.nofirstlastname.username)
  await t.typeText(LoginPage.passwordField, config.credentials.nofirstlastname.password)
  await t.click(LoginPage.loginButton)
  await t.expect(Navbar.username.innerText).eql('')
});
