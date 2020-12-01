import { ApolloLink, useMutation } from '@apollo/client'
import Alert from '@material-ui/lab/Alert'
import { createContext, FC, useEffect } from 'react'
import { anonymousSignInMutation } from './graphql/mutations/anonymous-sign-in'

export const UserIdContext = createContext<string>('')

let authorizationToken = localStorage.getItem('authorizationToken')
export const authenticationLink = new ApolloLink((operation, forward) => {
    if (authorizationToken) {
        operation.setContext({
            headers: {
                authorization: authorizationToken,
            },
        })
    }
    return forward(operation)
})

export const AuthenticationWrapper: FC = ({ children }) => {
    const [anonymousSignIn, { data, error }] = useMutation(
        anonymousSignInMutation,
    )
    const userid = data?.anonymousSignIn?.userid
    useEffect(
        () =>
            void anonymousSignIn().then(({ data }) => {
                const token = data?.anonymousSignIn?.token
                if (token) {
                    localStorage.setItem('authorizationToken', token)
                }
            }),
        [anonymousSignIn],
    )
    return error ? (
        <Alert severity='error'>
            Error: We could not connect to the server, please retry later!
        </Alert>
    ) : userid ? (
        <UserIdContext.Provider value={userid}>
            {children}
        </UserIdContext.Provider>
    ) : null
}
