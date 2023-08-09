import { Player } from ".";
import { render} from "@testing-library/react";
import renderer from 'react-test-renderer';


test('renders player', () => {
    const tree = renderer.create(<Player />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  