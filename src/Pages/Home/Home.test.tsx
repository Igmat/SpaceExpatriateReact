import { Home } from ".";
import { RouterProvider as Router, createMemoryRouter } from "react-router-dom";
import renderer from 'react-test-renderer';

test('renders Home', () => {

  const router = createMemoryRouter([{element:<Home/>, path:"/"}])

  const tree = renderer.create(
      <Router router={router} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

