import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import { loadTodos } from "../redux/actions";
import { bindActionCreators } from "redux";

// import { getTodos } from "../redux/selectors";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import { VISIBILITY_FILTERS } from "../constants";

// const TodoList = ({ todos, loadTodos }) => {
//   // loadTodos();
//   return (
//     <ul className="todo-list">
//       {todos && todos.length
//         ? todos.map((todo, index) => {
//             return <Todo key={`todo-${todo.id}`} todo={todo} />;
//           })
//         : "No todos, yay!"}
//     </ul>
//   );
// };

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    props.loadTodos();
  }
  render() {
    const { todos } = this.props;
    console.log(todos);
    return (
      <ul className="todo-list">
        {todos && todos.length
          ? todos.map((todo, index) => {
              return <Todo key={`todo-${todo.id}`} todo={todo} />;
            })
          : "No todos, yay!"}
      </ul>
    );
  }
}

// const mapStateToProps = state => {
//   const { byIds, allIds } = state.todos || {};
//   const todos =
//     allIds && state.todos.allIds.length
//       ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
//       : null;
//   return { todos };
// };

const mapStateToProps = state => {
  return { todos: state.todos.byIds };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadTodos
    },
    dispatch
  );

// export default TodoList;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
