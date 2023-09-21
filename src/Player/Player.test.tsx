import { Player } from ".";
import renderer from 'react-test-renderer';

test('renders player', () => {
    const tree = renderer.create(<Player />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  