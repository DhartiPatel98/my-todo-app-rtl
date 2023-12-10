import React from "react";
import "./TodoFooter.css";
import IFooter from "./types";

const TodoFooter: React.FC<IFooter> = ({ numberOfIncompleteTasks }) => {
  return (
    <div className="todo-footer">
      {numberOfIncompleteTasks}{" "}
      <span>{numberOfIncompleteTasks === 1 ? "task" : "tasks"} left</span>
    </div>
  );
};

export default TodoFooter;
