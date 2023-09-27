import renderer from 'react-test-renderer';
import { Board } from '.';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from '../Rules';
import { GameState } from '../Rules';

const originalRandom = Math.random;

beforeEach(() => Math.random = () => 1 / 2);

afterAll(() => Math.random = originalRandom);

test('Board snapshot', () => {

  const stateMock = new GameState("dd20421b-4c5f-40ca-a1d9-301dd44d6fcb");

  const tree = renderer.create(
    <Provider value={stateMock}>
      <Router>
        <Board />
      </Router>
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});