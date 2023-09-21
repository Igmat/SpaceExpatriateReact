import renderer from 'react-test-renderer'
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Home } from '../Pages/Home';
import { Game } from '../Pages/Game';

test('Board renders correctly', () => {
    const router = createMemoryRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/game",
            element: <Game />,
        }
    ]);
    const wrapper = renderer.create(
        <RouterProvider router={router} />
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
});