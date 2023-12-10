import React, { useState } from "react";
import { v4 } from "uuid";
import "./AddInput.css";
import AddToDo from "./types";
import TODO from "../Todo/types";

const AddInput: React.FC<AddToDo> = ({ setTodos, todos }) => {
  const [todo, setTodo] = useState<string>("");

  const addTodo = () => {
    if (!todo) return;
    const updatedTodos: TODO[] = [
      ...todos,
      {
        id: v4(),
        task: todo,
        completed: false,
      },
    ];
    setTodos(updatedTodos);
    setTodo("");
  };

  return (
    <div className="input-container">
      <input
        className="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new task here..."
        id="task-input"
      />
      <button className="add-btn" onClick={addTodo}>
        Add
      </button>
    </div>
  );
};

export default AddInput;
