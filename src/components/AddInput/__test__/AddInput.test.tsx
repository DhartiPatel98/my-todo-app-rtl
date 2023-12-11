import {
  fireEvent,
  render,
  screen,
  queryByAttribute,
} from "@testing-library/react";
import AddInput from "../AddInput";

const mockedSetTodoFn = jest.fn();

const queryById = queryByAttribute.bind(null, "id");

const changeInputValue = (value: string): HTMLInputElement => {
  const inputElement = screen.getByPlaceholderText(
    /Add a new task here.../i
  ) as HTMLInputElement;
  fireEvent.focus(inputElement);
  fireEvent.change(inputElement, {
    target: {
      value,
    },
  });
  return inputElement;
};

const addTodo = (): HTMLButtonElement => {
  const buttonElement = screen.getByRole("button", {
    name: /add/i,
  }) as HTMLButtonElement;
  fireEvent.click(buttonElement);
  return buttonElement;
};

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
    const value = "Task 1";
    const inputElement = changeInputValue(value);
    expect(inputElement.value).toBe(value);
  });

  // Test #4: submit function should be disabled when there is no input - using placeholder
  test("should disable the button when no value is present", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    changeInputValue("");
    const buttonElement = addTodo();
    expect(buttonElement.disabled).toBe(true);
  });

  // Test #4: submit function should be called when button is clicked - using placeholder
  test("should be called only once", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    const value = "Task 1";
    changeInputValue(value);

    addTodo();

    expect(mockedSetTodoFn).toBeCalledTimes(1);
  });

  // Test #5: user should be able to submit a new task - using placeholder
  test("should have empty input when add button is cliked", () => {
    const { container } = render(
      <AddInput todos={[]} setTodos={mockedSetTodoFn} />
    );

    const value = "Task 1";
    const inputElement = changeInputValue(value);

    addTodo();

    expect(inputElement.value).toBe("");

    const errorContainer = queryById(container, "todo-error");
    expect(errorContainer).toBeNull();
  });

  // !TO-DO: Complete the case
  // Test #6: there should be an error message when duplicate task is added
  // test("should display an error message for duplicate task", () => {
  //   const { container } = render(
  //     <AddInput todos={[]} setTodos={mockedSetTodoFn} />
  //   );
  //   const value = "Task 1";
  //   // Add "Task 1"
  //   changeInputValue(value);
  //   addTodo();

  //   // Add "Task 1" again
  //   changeInputValue(value);
  //   addTodo();

  //   const errorContainer = queryById(container, "todo-error");
  //   // const errorContainer = screen.getByText(/Task already exists/i);
  //   expect(errorContainer).toBeInTheDocument();
  // });

  // Test #7: The error message should be cleared when the input is cleared
  // test("should clear the error message when input value is cleared", () => {
  //   const { container } = render(
  //     <AddInput todos={[]} setTodos={mockedSetTodoFn} />
  //   );
  //   const value = "Task 1";
  //   // Add "Task 1"
  //   changeInputValue(value);
  //   addTodo();

  //   // Add "Task 1" again
  //   changeInputValue(value);
  //   addTodo();

  //   changeInputValue("");

  //   const errorContainer = queryById(container, "todo-error");
  //   expect(errorContainer).not.toBeNull();
  //   // getNodeText(errorContainer);
  // });
});
