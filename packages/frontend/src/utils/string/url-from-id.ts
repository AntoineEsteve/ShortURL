export const createUrlFromShortUrlId = (id: number) =>
    `${process.env.REACT_APP_GRAPHQL_ORIGIN}/${id.toString(36)}`
