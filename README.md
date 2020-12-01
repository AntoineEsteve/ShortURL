# ShortURL

ShortURL is a URL shortener web app built from scratch for a technical interview at Ambler.

## Development

Install the dependencies:

```sh
npm install
npx lerna bootstrap
```

For local development please create and initialize a sqlite3 database:

```sh
npx sqlite3 sqlite3.db
sqlite> .read ./prisma/init.sql
```

Build/run the backend:

```sh
cd packages/backend
npm run build && npm run start
```

GraphQL playground: http://localhost:4000/graphql

Build/serve the frontend (in another tab):

```sh
cd packages/frontend
npm run start
```

App: http://localhost:3000

## Stack

-   Backend:
    -   NodeJS
    -   Typescript
    -   GraphQL
    -   Apollo
    -   Koa
    -   Prisma2
    -   TypeGraphQL
    -   sqlite3 (for development but can connect to any SQL database compatible with Prisma2)
-   Frontend:
    -   Typescript
    -   React
    -   create-react-app
    -   GraphQL
    -   Apollo
    -   Material UI

_Please note that I used this interview to test libraries (Prisma2, TypeGraphQL, Apollo) and I didn't use them beforehand. So the configuration is probably not optimal._

## Timeline

### Monday Nov. 30th

-   8 AM: Start
-   8-9 AM: Monorepo, typescript and sqlite3 configured
-   9:30 AM: Prisma set up
-   12 PM: Apollo and type-graphql set up; first model and resolvers created
-   12-2 PM: Break
-   3 PM: Backend fully working + authentication
-   6 PM: Frontend configured with create-react-app, MaterialUI and Apollo Client
-   8 PM: App mostly working

Total: 10 hours

### Tuesday Dec. 1st

-   10 AM: Start
-   11 AM: Authentication rebuilt to be fully automatic and transparent for the user

## Things missing

-   Unit tests (as I didn't know most of those libs I don't know the best practices to test them)
-   Handle errors & loading states
-   GraphQL types in the frontend
-   Use subscriptions instead of pooling to refresh the lists
-   Update the cache when deleting/adding ShortURLs instead of refetching everything
-   Improve the UI to support smaller devices (<550px width) and to have better
