# ShortURL

ShortURL is a URL shortener web app built from scratch for a technical interview at Ambler.

## Demo

The app is hosted on Heroku which automatically deploy the branch `main`: https://ambler-shorturl.herokuapp.com/

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

## Stack

-   Backend:
    -   NodeJS
    -   Typescript
    -   GraphQL
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

## Timeline

Total time: ~14 hours

### Monday Nov. 30th

-   8 AM: Start
-   8-9 AM: Monorepo, typescript and sqlite3 configured
-   9:30 AM: Prisma set up
-   12 PM: Apollo and type-graphql set up; first model and resolvers created
-   12-2 PM: Break
-   3 PM: Backend fully working + authentication
-   6 PM: Frontend configured with create-react-app, MaterialUI and Apollo Client
-   8 PM: App mostly working

Total: ~10 hours

### Tuesday Dec. 1st

-   10 AM: Start
-   11 AM: Authentication rebuilt to be fully automatic and transparent for the user
-   11AM-1PM: Break
-   2 PM: Use herko for hosting
-   3PM: Change DB to postgresql for dev/demo env (because prisma only support one provider)
-   4 PM: Final state

Total: ~4 hours

## Things missing

-   Unit tests (as I didn't know most of those libs I don't know the best practices to test them)
-   Handle errors & loading states
-   GraphQL types in the frontend
-   Use subscriptions instead of pooling to refresh the lists
-   Update the cache when deleting/adding ShortURLs instead of refetching everything
-   Improve the UI to support smaller devices (<550px width) and to have better
