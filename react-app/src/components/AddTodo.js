import React from "react";
import { connect } from "react-redux";
import { addTodo, loadTodos } from "../redux/actions";

import _ from "lodash";
import { withStyles } from "@material-ui/styles";

//Compose
import compose from "recompose/compose";

//MUI Components
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  fab: {
    margin: theme.spacing(1)
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  componentDidMount() {
    //console.log(this.props)
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    this.props.addTodo(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Enter Todo description"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={e => this.updateInput(e.target.value)}
            value={this.state.input}
          />
          <Divider className={classes.divider} />
          <Fab
            color="primary"
            size="small"
            aria-label="add"
            className={classes.fab}
            onClick={this.handleAddTodo}
          >
            <AddIcon />
          </Fab>
        </Paper>
      </div>
    );
  }
}

//Using compose to expose with both withStyles(mui) and redux connector
export default compose(
  withStyles(styles, { name: "AddTodo" }),
  connect(
    null,
    { addTodo }
  )
)(AddTodo);
