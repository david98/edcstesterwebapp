import React from 'react'
import Home from './pages/Home'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { ApiBaseUrl } from './utils/ApiWrapper'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

export function App() {
    console.log(SwaggerUI)
    return (
        <ThemeProvider theme={darkTheme}>
            <Router>
                <Routes>
                    <Route
                        path="/apidocs"
                        element={
                            // @ts-ignore
                            <SwaggerUI
                                docExpansion="list"
                                url={ApiBaseUrl + 'swagger.json'}
                            />
                        }
                    ></Route>
                    <Route
                        path="/"
                        element={
                            <>
                                <CssBaseline />
                                <Home />
                            </>
                        }
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}

export default App
