import renderer from 'react-test-renderer';
import { Board } from '.';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from '../Rules';
import { GameState } from '../Rules';
import { mockedId } from '../Pages/Home/__mocks__/uuid'; 

const originalRandom = Math.random;

beforeEach(() => Math.random = () => 1 / 2);

afterAll(() => Math.random = originalRandom);

test('Board snapshot', () => {

  const stateMock = new GameState(mockedId());

  const tree = renderer.create(
    <Provider value={stateMock}>
      <Router>
        <Board />
      </Router>
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});