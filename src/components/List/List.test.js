import { List } from "./List";
import { configure, shallow} from "enzyme";
import {render, fireEvent} from '@testing-library/react'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });


const makeSut = () => {
    return render(
        <List />
    )
}

describe('List Component', () => {
    it("renders without crashing", () => {
        shallow(<List />);
    });

    it("renders input with empty value", () => {
        const list = makeSut()
        expect(list.getByTestId('todo-input')).toHaveValue('')
    });
      
    it("renders button with Add label and disabled", () => {
        const list = makeSut()
        expect(list.getByRole('button')).toHaveTextContent('Add')
        expect(list.getByRole('button')).toBeDisabled()
    });

    it("renders empty list of todos", () => {
        const list = makeSut()
        expect(list.getByTestId('todo-list').children).toHaveLength(0)
    });

    it("renders Total component", () => {
        const list = makeSut()
        expect(list.getByText("Total: 0/0")).toBeInTheDocument()
    });

    it("ensures state changes on input onChange", () => {
        const list = makeSut()
        const input = list.getByTestId('todo-input')
        fireEvent.change(input, {target: {value:"A"}})
        expect(input.value).toBe('A')
    });

    it("ensures button value changes onClick", () => {
        const list = makeSut()
        const input = list.getByTestId('todo-input')
        fireEvent.change(input, {target: {value:"A"}})
        const button = list.getByRole('button')
        fireEvent.click(button)
        expect(button).toHaveTextContent('Adding...')
    });

    it("ensures add new todo to the list", async () => {
        const list = makeSut()
        const input = list.getByTestId('todo-input')
        fireEvent.change(input, {target: {value:"A"}})
        const button = list.getByRole('button')
        fireEvent.click(button)
        // Since I know API call takes 2000 ms I am waiting for 2200 ms before testing
        setTimeout(() => {
            expect(list.getByTestId('todo-list').children).toHaveLength(1)
        }, 2200)
        
    });
})

