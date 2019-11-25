import React from 'react'
import Home from './pages/Home'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import { CssBaseline } from '@material-ui/core'
import './App.css'

const theme = createMuiTheme({
    palette: {
        primary: blue,
        type: 'dark',
    },
})

class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Home />
            </ThemeProvider>
        )
    }
}

export default App
