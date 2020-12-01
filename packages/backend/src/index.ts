import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import Koa from 'koa'
import Router from 'koa-router'
import serveStatic from 'koa-static'
import path from 'path'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { contextFunction } from './context'
import { prismaClient } from './prisma-client'
import { ShortUrlResolver } from './resolvers/shorturl'
import { UserResolver } from './resolvers/user'

const port = process.env.PORT ?? 4000

async function startServer() {
    const schema = await buildSchema({
        resolvers: [ShortUrlResolver, UserResolver],
    })

    const apolloServer = new ApolloServer({ schema, context: contextFunction })

    const router = new Router()
    // Redirect shorturls to their corresponding URLs if they exists
    router.get('/:id', async (ctx, next) => {
        const id = parseInt(ctx.params.id, 36)
        if (!Number.isInteger(id)) {
            return next()
        }
        const shortUrl = await prismaClient.shortUrl.findFirst({
            where: { id },
        })
        if (shortUrl?.url) {
            ctx.redirect(shortUrl?.url)
        }
        return next()
    })

    const app = new Koa()
    app.use(cors())
    app.use(apolloServer.getMiddleware())
    app.use(serveStatic(path.join(__dirname, '../../frontend/build')))
    console.log(
        'Serving static files from',
        path.join(__dirname, '../frontend/build'),
    )
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
