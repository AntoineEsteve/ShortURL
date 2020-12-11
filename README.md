# ShortURL

ShortURL is a URL shortener web app built from scratch for a technical interview.

## Demo

The app is hosted on Heroku which automatically deploy the branch `main`: https://shorturl-demo.herokuapp.com/

## Usage

Install the dependencies:

```sh
npm install
```

For local testing, you need to have postgresql installed. Then please create a database `shorturl`, an super admin with name `shorturl` and password `shorturl` too:

```console
➜  backend git:(main) ✗ sudo -u postgres -i
postgres@antoine-aero:~$ createuser --interactive --pwprompt
Enter name of role to add: shorturl
Enter password for new role:
Enter it again:
Shall the new role be a superuser? (y/n) y
postgres@antoine-aero:~$ createdb shorturl
```

You also need to init the database:

```sh
psql postgresql://shorturl:shorturl@localhost:5432/shorturl -f packages/backend/prisma/init.sql
```

Build the packages:

```sh
npm run build
```

Start the backend which also serve the frontend:

```sh
npm run start
```

App: http://localhost:4000

GraphQL playground: http://localhost:4000/graphql

### Contributing

If you want to edit the frontend you should run webpack instead:

```sh
cd packages/frontend
npm run start
```

App: http://localhost:3000

If you change the GraphQL schema in the backend or the queries/mutations in the frontend, you will have to regenerate the types for the frontend package:

```sh
cd packages/frontend
npm run codegen
```

## Stack

-   Backend:
    -   NodeJS
    -   Typescript
    -   GraphQL
    -   graphql-code-generator
    -   Apollo
    -   Koa
    -   Prisma2
    -   TypeGraphQL
    -   postgresql
-   Frontend:
    -   Typescript
    -   React
    -   create-react-app
    -   GraphQL
    -   Apollo
    -   Material UI

_Please note that I used this interview to test libraries (Prisma2, TypeGraphQL, Apollo) and I didn't use them beforehand. So the configuration is probably not optimal._

## Things missing

-   Unit tests (as I didn't know most of those libs I don't know the best practices to test them)
-   Handle errors & loading states
-   Use subscriptions instead of pooling to refresh the lists
-   Update the cache when deleting/adding ShortURLs instead of refetching everything
-   Improve the UI to support smaller devices (<550px width) and to have better
