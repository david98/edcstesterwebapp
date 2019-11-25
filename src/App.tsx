import React from "react";
import { Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </ThemeProvider>
    );
  }
}

const theme = createMuiTheme({});

export default App;
