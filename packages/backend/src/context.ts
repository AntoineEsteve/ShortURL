import { PrismaClient, User } from '@prisma/client'
import jsonwebtoken from 'jsonwebtoken'
import Koa from 'koa'
import { authenticationSecret } from './authentication'
import { prismaClient } from './prisma-client'

export interface Context {
    prismaClient: PrismaClient
    user?: User
    token?: string
}

export const contextFunction = async ({
    ctx,
}: {
    ctx: Koa.Context
}): Promise<Context> => {
    const token = ctx.req.headers.authorization
    let user: User | undefined
    if (token) {
        const { id } = jsonwebtoken.verify(token, authenticationSecret) as {
            id: number
        }
        const existingUser = await prismaClient.user.findFirst({
            where: { id },
        })
        if (existingUser) {
            user = existingUser
        }
    }
    return { prismaClient, user, token }
}
