import React, { useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import { Auth, Hub } from "aws-amplify";
import "./styles.css";

class TodoApp extends React.Component {
  state = { user: null };

  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(() => console.log("Not signed in"));
  }

  signOut(){
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="todo-app">
        <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
        <button onClick={() => this.signOut()}>Sign Out</button>
        <h1>Todo List</h1>
        <AddTodo />
        <TodoList />
        <VisibilityFilters />
      </div>
    );
  };
}

export default TodoApp;
