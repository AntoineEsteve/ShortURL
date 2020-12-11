import Router from 'koa-router'
import { prismaClient } from './prisma-client'

export function createRouter() {
    const router = new Router()
    // Route used to redirect shorturls to their corresponding URLs if they exists
    router.get('/:id', async (ctx, next) => {
        const id = parseInt(ctx.params.id, 36)
        if (!Number.isInteger(id)) {
            return next()
        }
        const shortUrl = await prismaClient.shortUrl.findFirst({
            where: { id },
        })
        if (shortUrl?.url) {
            return ctx.redirect(shortUrl?.url)
        }
        return next()
    })
    return router
}
