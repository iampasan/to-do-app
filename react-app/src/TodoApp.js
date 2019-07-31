import React, { useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import { Auth, Hub, API } from "aws-amplify";
import { connect } from "react-redux";
import { setUser } from "./redux/actions";
import { bindActionCreators } from "redux";

//UI Elements/Pages
import Landing from "./components/Landing";
import NavBar from "./components/ui-elements/NavBar";

//Material UI
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

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
    if (this.props.user) {
      //If user is Logged in render app
      return (
        <div>
          <NavBar />
          <Typography variant="h2" gutterBottom>
            Todo List
          </Typography>
          <AddTodo />
          <TodoList />
          <VisibilityFilters />
        </div>
      );
    } else {
      //Else render landing page
      return <Landing />;
    }
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return { user };
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
