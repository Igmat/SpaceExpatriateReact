import { Enemy } from ".";
import renderer from "react-test-renderer";

test("renders enemy", () => {
    const tree = renderer.create(<Enemy />).toJSON();
    expect(tree).toMatchSnapshot();
});
    

