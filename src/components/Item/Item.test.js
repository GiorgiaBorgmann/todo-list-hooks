import { Item } from "./Item";
import { render } from "@testing-library/react";

const taskToDo = {
  id: 123,
  toDoText: "to do 1",
  completed: false,
};

const makeSut = () => render(<Item toDoTask={taskToDo} />);

describe("Item Component", () => {
  
  it("test if input receive value", () => {
    const item = makeSut();
    expect(item.getByTestId("toDoTask-input")).toHaveValue("to do 1");
  });
});
