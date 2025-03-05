import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import App from '../../src/App';

test('renders correctly and interacts with elements', () => {
  const { getByText, getByTestId } = render(<App />);

  // Check if a specific text is rendered
  expect(getByText('Welcome to React Native!')).toBeTruthy();

  // Interact with a button
  fireEvent.press(getByTestId('my-button'));

  // Check if the button press caused the expected outcome
  expect(getByText('Button Pressed')).toBeTruthy();
});