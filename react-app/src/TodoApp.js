import React, { useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import { Auth, Hub, API } from "aws-amplify";
import { connect } from "react-redux";
import { setUser } from "./redux/actions";
import { bindActionCreators } from "redux";
import "./styles.css";

class TodoApp extends React.Component {

  async componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.props.setUser(data);
          console.log("Sign in - HUB");
          break;
        case "signOut":
          console.log("Sign out - HUB");
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.props.setUser(user))
      .catch(() => console.log("Not signed in"));
  }

  //Amplify SignOut
  signOut() {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    console.log("Propss");
    console.log(this.props);
    if(this.props.user){
      //If user is Logged in render app
      return (
        <div className="todo-app">
          <button onClick={() => this.signOut()}>Sign Out</button>
          <h1>Todo List</h1>
          <AddTodo />
          <TodoList />
          <VisibilityFilters />
        </div>
      );
    }else{
      //Else render only Sign in Or up button
      return (
        <div className="todo-app">
          <button onClick={() => Auth.federatedSignIn()}>Register or Sign In</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return { user};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser
    },
    dispatch
  );

//export default TodoApp;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp);
