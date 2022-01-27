import React from 'react';
import { render } from 'test-utils';
import App from './App';

// see https://github.com/apexcharts/react-apexcharts/issues/197
// need to mock apexcharts until upstream fixes the issue

// I added only the following two mocks.
jest.mock('react-apexcharts', () =>
  jest.fn(() => {
    return null;
  })
);
jest.mock('apexcharts', () => ({
  exec: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve('uri');
    });
  }),
}));

test('renders the main menu', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/BUSINESS OPS/i);
  expect(linkElement).toBeInTheDocument();
});
