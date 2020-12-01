import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'
import { ApolloServer } from 'apollo-server-koa'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ShortUrlResolver } from './resolvers/shorturl'
import { contextFunction } from './context'
import { prismaClient } from './prisma-client'
import { UserResolver } from './resolvers/user'

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
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen({ port: 4000 }, () =>
        console.log(
            `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`,
        ),
    )
}

startServer().catch((error) => {
    console.error('An error occured while starting the server', error)
    process.exit(1)
})
