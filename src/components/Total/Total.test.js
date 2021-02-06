import { Total } from "./Total";
import { configure, shallow } from "enzyme";
import { TotalContext } from "../List/List";
import { render } from "@testing-library/react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

const makeSut = (list) => {
  return render(
    <TotalContext.Provider value={list}>
      <Total />
    </TotalContext.Provider>
  );
};

describe("Total Component", () => {
  it("renders without crashing", () => {
    shallow(<Total />);
  });

  it("count completed tasks and display on screen", () => {
    const list = [
      {
        id: 123,
        toDoText: "to do 1",
        completeToDo: false,
      },
      {
        id: 1234,
        toDoText: "to do 2",
        completeToDo: true,
      },
    ];
    const EmptyTotal = makeSut([]);
    expect(EmptyTotal.getByText("Total: 0/0")).toBeInTheDocument();
    const total = makeSut(list);
    expect(total.getByText("Total: 1/2")).toBeInTheDocument();
  });
});
