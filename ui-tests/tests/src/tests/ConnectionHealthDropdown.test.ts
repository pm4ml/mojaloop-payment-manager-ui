import { ConnectionHealthDropdownComponent } from '../page-objects/pages/ConnectionHealthDropdownComponent';
import { LoginPage } from '../page-objects/pages/LoginPage';
import { t, ClientFunction } from 'testcafe';
import { config } from '../config';
import {
  getConnectionStateData,
  connectionStates
} from '../../../../src/App/TechnicalDashboard/ConnectionHealth/helpers';

declare global {
  interface Window {
    store?: () => any;
  }
}

async function login() {
  await t
    .typeText(LoginPage.usernameField, config.credentials.test.username)
    .typeText(LoginPage.passwordField, config.credentials.test.password)
    .click(LoginPage.loginButton);
}

fixture`Connection Health Dropdown Feature`.page`${config.pm4mlEndpoint}/techdashboard`.beforeEach(
  async () => {
    await login();
  }
);

function hexToRgb(hex: string): string {
  if (!/^#?[0-9A-Fa-f]{3,6}$/.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('');
  }

  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

const getReduxConnectionHealthStateData = ClientFunction(() => {
  return window.store ? window.store().getState().states.data?.data || {} : {};
});

test('Connection health displays correct status summary and color indicator', async () => {
  const state = await getReduxConnectionHealthStateData();
  if (!state) {
    throw new Error('Redux state is undefined. Ensure the store is initialized.');
  }

  const data = getConnectionStateData(state);
  const connectionStatus = data.connectionStatus;
  const connectionStatesData = connectionStates[connectionStatus];

  if (!connectionStatesData) {
    throw new Error(`Invalid connection status: ${connectionStatus}`);
  }

  const connectionColor = connectionStatesData.color;
  const connectionMessage = connectionStatesData.message;
  const rgbColor = hexToRgb(connectionColor.toUpperCase());
  await t
    .expect(ConnectionHealthDropdownComponent.connectionStatusMessage.exists)
    .ok('Connection status container not found')
    .expect(ConnectionHealthDropdownComponent.connectionStatusMessage.innerText)
    .eql(connectionMessage, 'Connection status message does not match')
    .expect(ConnectionHealthDropdownComponent.connectionStatusIndicatorColor.getStyleProperty('background-color'))
    .eql(rgbColor, 'Connection status color does not match');
});

test('User can log in and see the connection status container', async () => {
  await t
    .expect(ConnectionHealthDropdownComponent.connectionStatusContainer.exists)
    .ok('Connection status container not found');
});

test('Dropdown button is visible', async () => {
  await t
    .expect(ConnectionHealthDropdownComponent.dropdownButton.exists)
    .ok('Dropdown button not found');
});

test('Dropdown toggles visibility when clicked', async () => {
  await t
    .expect(ConnectionHealthDropdownComponent.dropdownContent.visible)
    .notOk('Dropdown should be hidden initially');

  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t
    .expect(ConnectionHealthDropdownComponent.dropdownContent.visible)
    .ok('Dropdown should be visible after clicking');

  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t
    .expect(ConnectionHealthDropdownComponent.dropdownContent.visible)
    .notOk('Dropdown should be hidden after clicking again');
});

test('Recreate buttons appear when dropdown is expanded', async () => {
  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t
    .expect(ConnectionHealthDropdownComponent.recreateOutboundTLSButton.exists)
    .ok('Recreate Outbound TLS button not found');
  await t
    .expect(ConnectionHealthDropdownComponent.recreateJWSButton.exists)
    .ok('Recreate JWS button not found');
});

test('Clicking Recreate JWS opens modal with disabled submit button', async () => {
  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t.click(ConnectionHealthDropdownComponent.recreateJWSButton);

  await t
    .expect(ConnectionHealthDropdownComponent.modalContainer.exists)
    .ok('Recreate modal did not appear');

  await t
    .expect(ConnectionHealthDropdownComponent.modalTitleJWS.exists)
    .ok('Modal title is incorrect or missing');

  await t
    .expect(ConnectionHealthDropdownComponent.recreateJWSSubmitButton.exists)
    .ok('Modal submit button is incorrect or missing');

  await t
    .expect(ConnectionHealthDropdownComponent.recreateJWSSubmitButton.hasAttribute('disabled'))
    .ok('Submit button should be disabled when the modal opens');
});

test('Clicking Recreate Outbound TLS opens modal with disabled submit button', async () => {
  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t.click(ConnectionHealthDropdownComponent.recreateOutboundTLSButton);
  await t
    .expect(ConnectionHealthDropdownComponent.modalContainer.exists)
    .ok('Recreate modal did not appear');
  await t
    .expect(ConnectionHealthDropdownComponent.modalTitleTLS.exists)
    .ok('Modal title is incorrect or missing');
  await t
    .expect(ConnectionHealthDropdownComponent.recreateOutboundTLSSubmitButton.exists)
    .ok('Modal submit button is incorrect or missing');
  await t
    .expect(
      ConnectionHealthDropdownComponent.recreateOutboundTLSSubmitButton.hasAttribute('disabled')
    )
    .ok('Submit button should be disabled when the modal opens');
});

test('Clicking header close button closes modal', async () => {
  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t.click(ConnectionHealthDropdownComponent.recreateOutboundTLSButton);
  await t
    .expect(ConnectionHealthDropdownComponent.modalContainer.exists)
    .ok('Recreate modal did not appear');
  await t.click(ConnectionHealthDropdownComponent.modalHeaderCloseButton);
  await t
    .expect(ConnectionHealthDropdownComponent.modalContainer.exists)
    .notOk('Recreate modal did not close');
});

test('Clicking footer close button closes modal', async () => {
  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t.click(ConnectionHealthDropdownComponent.recreateJWSButton);
  await t
    .expect(ConnectionHealthDropdownComponent.modalContainer.exists)
    .ok('Recreate modal did not appear');
  await t.click(ConnectionHealthDropdownComponent.modalFooterCloseButton);
  await t
    .expect(ConnectionHealthDropdownComponent.modalContainer.exists)
    .notOk('Recreate modal did not close');
});

test('Recreate reason text enables submit button', async () => {
  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t.click(ConnectionHealthDropdownComponent.recreateJWSButton);

  await t
    .expect(ConnectionHealthDropdownComponent.modalContainer.exists)
    .ok('Recreate modal did not appear');
  await t
    .expect(ConnectionHealthDropdownComponent.recreateJWSSubmitButton.hasAttribute('disabled'))
    .ok('Submit button should be disabled initially');

  await t.typeText(ConnectionHealthDropdownComponent.recreateReasonInput, 'test reason');

  await t
    .expect(ConnectionHealthDropdownComponent.recreateJWSSubmitButton.hasAttribute('disabled'))
    .notOk('Submit button should be enabled after entering reason');
});

test('Submit button gets disabled again after entering and then deleting the reason', async (t) => {
  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t.click(ConnectionHealthDropdownComponent.recreateJWSButton);
  await t
    .expect(ConnectionHealthDropdownComponent.recreateJWSSubmitButton.hasAttribute('disabled'))
    .ok();

  await t.typeText(
    ConnectionHealthDropdownComponent.recreateReasonInput,
    'Delete Reason Before Submit'
  );
  await t.selectText(ConnectionHealthDropdownComponent.recreateReasonInput).pressKey('delete');

  await t
    .expect(ConnectionHealthDropdownComponent.recreateJWSSubmitButton.hasAttribute('disabled'))
    .ok();
});

test('Clicking submit button triggers action when a valid reason is entered', async (t) => {
  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t.click(ConnectionHealthDropdownComponent.recreateJWSButton);

  await t.typeText(
    ConnectionHealthDropdownComponent.recreateReasonInput,
    'Valid reason for recreation'
  );

  await t
    .expect(ConnectionHealthDropdownComponent.recreateJWSSubmitButton.hasAttribute('disabled'))
    .notOk('Submit button should be enabled after entering a valid reason');

  await t.click(ConnectionHealthDropdownComponent.recreateJWSSubmitButton);

  await t
    .expect(ConnectionHealthDropdownComponent.modalContainer.exists)
    .notOk('Modal should close after successful submission');
});

test('Submit button remains disabled if reason contains only spaces', async (t) => {
  await t.click(ConnectionHealthDropdownComponent.dropdownButton);
  await t.click(ConnectionHealthDropdownComponent.recreateJWSButton);

  await t
    .expect(ConnectionHealthDropdownComponent.modalContainer.exists)
    .ok('Modal did not appear');

  await t.typeText(
    ConnectionHealthDropdownComponent.recreateReasonInput,
    '                       '
  );

  await t
    .expect(ConnectionHealthDropdownComponent.recreateJWSSubmitButton.hasAttribute('disabled'))
    .ok('Submit button should not be enabled when reason has spaces only');
});
