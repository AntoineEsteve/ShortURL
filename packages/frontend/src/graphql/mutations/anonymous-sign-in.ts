import { gql } from '@apollo/client'

export const anonymousSignInMutation = gql`
    mutation AnonymousSignIn {
        anonymousSignIn {
            userId
            token
        }
    }
`
