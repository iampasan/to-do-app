import React from "react";
import Button from "@material-ui/core/Button";
//import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  login_container: {
    marginTop : "20em"
  }
});

export default function Landing() {
  const classes = useStyles();
  return (
    <Box my={4} align="center" className={classes.login_container}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the To-do App!
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => Auth.federatedSignIn()}
        >
          Register or Sign In
        </Button>
      </Box>
  );
}
