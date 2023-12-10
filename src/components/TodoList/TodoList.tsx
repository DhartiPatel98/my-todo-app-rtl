import React, { useCallback } from "react";
import TodoFooter from "../TodoFooter/TodoFooter";
import "./TodoList.css";
import ICommonToDoProps from "../AddInput/types";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete-icon.svg";
import { ReactComponent as RestoreIcon } from "../../assets/icons/restore.svg";

const TodoList: React.FC<ICommonToDoProps> = ({ todos, setTodos }) => {
  const updateTask = useCallback(
    (id: string) => {
      let updatedTasks = todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          return todo;
        } else {
          return todo;
        }
      });
      setTodos(updatedTasks);
    },
    [todos, setTodos]
  );

  const calcNumberOfIncompletedTasks = useCallback(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  return (
    <div className="todolist-container">
      <div className="todos-container">
        <div>
          {todos.map((todo) => (
            <div
              className={`todo-item ${todo.completed && "todo-item-completed"}`}
              key={todo.id}
            >
              <div>{todo.task}</div>
              {todo.completed ? (
                <RestoreIcon
                  width={20}
                  height={20}
                  onClick={() => updateTask(todo.id)}
                />
              ) : (
                <DeleteIcon
                  width={20}
                  height={20}
                  onClick={() => updateTask(todo.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <TodoFooter numberOfIncompleteTasks={calcNumberOfIncompletedTasks()} />
      </div>
    </div>
  );
};

export default TodoList;
