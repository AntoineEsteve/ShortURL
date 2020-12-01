import { gql } from '@apollo/client'

export const createShortUrlMutation = gql`
    mutation CreateShortUrl($url: String!) {
        createShortUrl(url: $url) {
            id
            url
            userId
        }
    }
`
