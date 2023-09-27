import { Player } from ".";
import renderer from 'react-test-renderer';
import { GameState, Provider } from "../Rules";

const originalRandom = Math.random;

beforeEach(() => Math.random = () => 1 / 2);

afterAll(() => Math.random = originalRandom);

test('renders player', () => {

  const stateMock = new GameState("dd20421b-4c5f-40ca-a1d9-301dd44d6fcb");

  const tree = renderer.create(
    <Provider value={stateMock}>
      <Player />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

