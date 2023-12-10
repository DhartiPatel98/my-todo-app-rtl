import { fireEvent, render, screen } from "@testing-library/react";
import AddInput from "../AddInput";

const mockedSetTodoFn = jest.fn();

describe("Add Input", () => {
  // Test #1: should render input element - using placeholder
  test("should render input element", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  // Test #2: user should be able to enter value - using placeholder
  test("should be able to enter value", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    const inputElement = screen.getByPlaceholderText(
      /Add a new task here.../i
    ) as HTMLInputElement;
    fireEvent.focus(inputElement);
    const value = "Task 1";
    fireEvent.change(inputElement, {
      target: {
        value,
      },
    });
    expect(inputElement.value).toBe(value);
  });

  // Test #3: submit function should be called when button is clicked - using placeholder
  test("should be called only once", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    const inputElement = screen.getByPlaceholderText(
      /Add a new task here.../i
    ) as HTMLInputElement;
    fireEvent.focus(inputElement);

    const value = "Task 1";
    fireEvent.change(inputElement, {
      target: {
        value,
      },
    });

    const buttonElement = screen.getByRole("button", {
      name: /add/i,
    });
    fireEvent.click(buttonElement);

    expect(mockedSetTodoFn).toBeCalled();
  });

  // Test #4: user should be able to submit a new task - using placeholder
  test("should have empty input when add button is cliked", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    const inputElement = screen.getByPlaceholderText(
      /Add a new task here.../i
    ) as HTMLInputElement;
    fireEvent.focus(inputElement);

    const value = "Task 1";
    fireEvent.change(inputElement, {
      target: {
        value,
      },
    });

    const buttonElement = screen.getByRole("button", {
      name: /add/i,
    });
    fireEvent.click(buttonElement);

    expect(inputElement.value).toBe("");
  });
});
