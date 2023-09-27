import { Player } from ".";
import renderer from 'react-test-renderer';
import { GameState, Provider } from "../Rules";
import { mockedId } from '../Pages/Home/__mocks__/uuid'; 

const originalRandom = Math.random;

beforeEach(() => Math.random = () => 1 / 2);

afterAll(() => Math.random = originalRandom);

test('renders player', () => {

  const stateMock = new GameState(mockedId());

  const tree = renderer.create(
    <Provider value={stateMock}>
      <Player />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

