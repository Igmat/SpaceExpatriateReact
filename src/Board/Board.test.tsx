import { render } from '@testing-library/react';
import { Board } from '.';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from '../Rules';
import { GameState } from '../Rules';

const originalRandom = Math.random;

beforeEach(() => Math.random = () => 1 / 2);

afterAll(() => Math.random = originalRandom);

test('Board snapshot', () => {
  
  const stateMock = new GameState();

  const { asFragment } = render(
    <Provider value={stateMock}>
      <Router>
        <Board />
      </Router>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
/*
const gameStateMock = {
    round: { current: 5 },
    decks: {
        delivery: {},
        engineering: {},
        terraforming: {},
        military: {},
    },
    hand: stateMock.hand,
    resources: stateMock.resources,
    table: stateMock.table,
    action: stateMock.action,
};
*/