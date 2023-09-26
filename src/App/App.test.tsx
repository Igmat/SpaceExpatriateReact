import renderer from 'react-test-renderer';
import App from '.';

test("App render" , () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
