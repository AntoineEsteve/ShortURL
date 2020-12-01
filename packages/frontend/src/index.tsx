import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { apolloClient } from './apollo-client'
import logo from './assets/logo.png'
import { AuthenticationWrapper } from './authentication'
import { ShortUrlCreationForm } from './components/shorturl-creation-form'
import { ShortUrlHistory } from './components/shorturl-history'
import './style/global.css'
import { theme } from './style/theme'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <ApolloProvider client={apolloClient}>
                <img className='logo' src={logo} alt='' aria-hidden />
                <AuthenticationWrapper>
                    <ShortUrlCreationForm />
                    <ShortUrlHistory onlyUser={true} />
                    <ShortUrlHistory onlyUser={false} />
                </AuthenticationWrapper>
            </ApolloProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
