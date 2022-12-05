import React from 'react'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { LinkProps } from '@mui/material/Link'
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom'

import common_en_us from './translations/en-US/common.json'
import { createTheme, ThemeProvider } from '@mui/material'

const LinkBehavior = React.forwardRef<
    any,
    Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
    const { href, ...other } = props
    // Map href (MUI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />
})

i18next.init({
    interpolation: { escapeValue: false },
    fallbackLng: 'en-US',
    resources: {
        'en-US': {
            common: common_en_us,
        },
    },
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            } as LinkProps,
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
    },
})

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <ThemeProvider theme={darkTheme}>
                <App />
            </ThemeProvider>
        </I18nextProvider>
    </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
