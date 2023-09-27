import { Player } from ".";
import renderer from 'react-test-renderer';
import { GameState, Provider } from "../Rules";

const originalRandom = Math.random;

beforeEach(() => Math.random = () => 1 / 2);

afterAll(() => Math.random = originalRandom);

test('renders player', () => {

  const mockedGameState = new GameState()

  const tree = renderer.create(
    <Provider value={mockedGameState}>
      <Player />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
