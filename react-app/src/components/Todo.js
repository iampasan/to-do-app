import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleTodo, removeTodo } from "../redux/actions";



const Todo = ({ todo, toggleTodo, removeTodo }) => (
  <div>
  <li className="todo-item" onClick={() => toggleTodo(todo.taskId, todo.completed, todo.description)}>
    {todo && todo.completed ? "👌" : "👋"}{" "}
    <span
      className={cx(
        "todo-item__text",
        todo && todo.completed && "todo-item__text--completed"
      )}
    >
      {todo.description}
    </span>
    
  </li>
  <button onClick={() => removeTodo(todo.taskId)}><span>❌</span></button>
 </div>
 
);

// export default Todo;
export default connect(
  null,
  { toggleTodo,removeTodo }
)(Todo);
