import { fireEvent, render, screen } from "@testing-library/react";
import Todo from "../Todo";

function addToDo(todos: Array<string>) {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole("button", {
    name: /Add/i,
  });

  todos.forEach((todo) => {
    fireEvent.change(inputElement, { target: { value: todo } });
    fireEvent.click(buttonElement);
  });
}

describe("Add TODO", () => {
  // Test #1: User should be able to add a new task and it should be present in the list
  test("should add a new task", () => {
    render(<Todo />);
    const task: Array<string> = ["Task 1"];
    addToDo(task);

    const taskElement = screen.getByText("Task 1");
    expect(taskElement).toBeInTheDocument();
  });

  // Test #2: Multiple ToDos should be present in the list when added
  test("should render multiple items", () => {
    render(<Todo />);
    const task: Array<string> = ["Task 1", "Task 2", "Task 3"];
    addToDo(task);

    const taskElement = screen.queryAllByText(/Task/);
    expect(taskElement.length).toBe(3);
  });

  // Test #3: ToDo should be in incompleted state initially
  test("should be in incomplete state", () => {
    render(<Todo />);
    const task: Array<string> = ["Task 1"];
    addToDo(task);

    const taskElement = screen.getByText("Task 1");
    expect(taskElement).not.toHaveClass("todo-item-completed");
  });

  // Test #4: ToDo should be in completed state when deleted
  //   test("should be in complete state", () => {
  //     render(<Todo />);
  //     const task: Array<string> = ["Task 1"];
  //     addToDo(task);

  //     const taskElement = screen.getByText(/todo-item-/i);

  //     const deleteButton = screen.getByRole("button", {
  //       name: /delete-todo-/,
  //     });

  //     fireEvent.click(deleteButton);

  //     expect(taskElement).toHaveClass("todo-item-completed");
  //   });
});
