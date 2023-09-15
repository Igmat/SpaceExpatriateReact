
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '.';

test('renders learn react link', () => {
  const {container} = render(<App/>);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const appElement = container.getElementsByClassName("App")[0];
  expect(appElement).toBeInTheDocument();
  //expect(linkElement).toBeCalled();
  //expect(linkElement).not.toBeCalled();
  expect(1 + 2).toBe(3);
});
