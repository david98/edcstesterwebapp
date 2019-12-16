import React from 'react'
import Home from './pages/Home'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import { CssBaseline } from '@material-ui/core'
import './App.css'

import { ApiBaseUrl } from './utils/ApiWrapper'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

const theme = createMuiTheme({
    palette: {
        primary: blue,
        type: 'dark',
    },
})

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/apidocs">
                        <SwaggerUI
                            docExpansion="list"
                            url={ApiBaseUrl + 'swagger.json'}
                        />
                    </Route>
                    <Route path="/">
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Home />
                        </ThemeProvider>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App
