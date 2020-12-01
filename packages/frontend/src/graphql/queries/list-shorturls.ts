import { gql } from '@apollo/client'

export const listShortUrlsQuery = gql`
    query ListeShortUrls($onlyUser: Boolean!) {
        listShortUrls(onlyUser: $onlyUser) {
            id
            url
            userid
        }
    }
`
