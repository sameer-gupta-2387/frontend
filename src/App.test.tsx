import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders main page', () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId('main-page')).not.toBeNull();
});
