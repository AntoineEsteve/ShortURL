import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { authenticationLink } from './user/authentication'
import './style/global.css'

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ORIGIN + '/graphql',
})

export const apolloClient = new ApolloClient({
    link: authenticationLink.concat(httpLink),
    cache: new InMemoryCache(),
})
