import { ResourceComponent } from "./index";
import { render } from "@testing-library/react";

test("renders resource component for biotic materials", () => {
    const {container} = render(<ResourceComponent type={"biotic materials"} />);
    const resourseElement = container.getElementsByClassName("biotic-materials")[0];
    expect(resourseElement).toBeInTheDocument();
});

test("renders resource component for dark matter", () => {
    const {container} = render(<ResourceComponent type={"dark matter"} />);
    const resourseElement = container.getElementsByClassName("dark-matter")[0];
    expect(resourseElement).toBeInTheDocument();
});

test("renders resource component for fuel", () => {
    const {container} = render(<ResourceComponent type={"fuel"} />);
    const resourseElement = container.getElementsByClassName("fuel")[0];
    expect(resourseElement).toBeInTheDocument();
});

test("renders resource component for machinery", () => {
    const {container} = render(<ResourceComponent type={"machinery"} />);
    const resourseElement = container.getElementsByClassName("machinery")[0];
    expect(resourseElement).toBeInTheDocument();
});

test("renders resource component for minerals", () => {
    const {container} = render(<ResourceComponent type={"minerals"} />);
    const resourseElement = container.getElementsByClassName("minerals")[0];
    expect(resourseElement).toBeInTheDocument();
});

test("renders resource component for nanotechnologies", () => {
    const {container} = render(<ResourceComponent type={"nanotechnologies"} />);
    const resourseElement = container.getElementsByClassName("nanotechnologies")[0];
    expect(resourseElement).toBeInTheDocument();
});
