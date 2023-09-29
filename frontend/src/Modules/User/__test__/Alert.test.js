import React from 'react';
import { render } from '@testing-library/react';
import Alert from '../Components/Alert';
import { Context } from '../Components/AlertContext';

// Create a mock context with a sample alert
const mockAlert = {
  message: 'Test Message',
  status: 'success',
};
const MockContextProvider = ({ children }) => (
  <Context.Provider value={{ alert: mockAlert }}>{children}</Context.Provider>
);

describe("<Addplayer>", () => {

test('Alert component renders with success alert', () => {
  const { getByText } = render(
    <MockContextProvider>
      <Alert />
    </MockContextProvider>
  );

  const alertContainer = getByText('Success! Test Message');
  expect(alertContainer).toBeInTheDocument();
  expect(alertContainer).not.toHaveClass('alertContainerRed');
});

test('Alert component renders with error alert', () => {
  // Change the alert status to 'error'
  mockAlert.status = 'error';

  const { getByText } = render(
    <MockContextProvider>
      <Alert />
    </MockContextProvider>
  );

  // Assert that the component renders the error alert
  const alertContainer = getByText('Error! Test Message');
  expect(alertContainer).toBeInTheDocument();
  expect(alertContainer).not.toHaveClass('alertContainerGreen');
});

});