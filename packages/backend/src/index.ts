import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import Koa from 'koa'
import serveStatic from 'koa-static'
import path from 'path'
import { contextFunction } from './context'
import { createRouter } from './rest-router'
import { schema } from './schema'

const port = process.env.PORT ?? 4000

async function startServer() {
    const app = new Koa()
    app.use(cors())

    // GraphQL endpoints
    const apolloServer = new ApolloServer({ schema, context: contextFunction })
    app.use(apolloServer.getMiddleware())

    // Serve static files
    // It's used to deploy the app on heroku (the backend serve the frontend)
    // A better solution would be to use a static hosting (e.g. S3)
    app.use(serveStatic(path.join(__dirname, '../../frontend/build')))
    console.log(
        'Serving static files from',
        path.join(__dirname, '../frontend/build'),
    )

    // Other endpoints
    const router = createRouter()
    app.use(router.routes())
    app.use(router.allowedMethods())

    app.listen({ port }, () =>
        console.log(
            `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`,
        ),
    )
}

startServer().catch((error) => {
    console.error('An error occured while starting the server', error)
    process.exit(1)
})
