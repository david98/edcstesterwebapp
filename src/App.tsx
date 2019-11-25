import React from 'react'
import Home from './pages/Home'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Home />
            </ThemeProvider>
        )
    }
}

const theme = createMuiTheme({})

export default App
