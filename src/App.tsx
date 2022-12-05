import React from 'react'
import Home from './pages/Home'
import { CssBaseline } from '@mui/material'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { ApiBaseUrl } from './utils/ApiWrapper'

export function App() {
    return (
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
    )
}

export default App
