import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '.';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  //expect(linkElement).toBeCalled();
  //expect(linkElement).not.toBeCalled();
  expect(1 + 2).toBe(3);
});
