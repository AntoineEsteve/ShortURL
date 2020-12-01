import { gql } from '@apollo/client'

export const deleteShortUrlMutation = gql`
    mutation DeleteShortUrl($id: Int!) {
        deleteShortUrl(id: $id)
    }
`
