import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UnauthorizedError,
} from 'type-graphql'
import { Context } from '../context'
import { ShortUrl } from '../models/shorturl'

@Resolver()
export class ShortUrlResolver {
    @Query(() => ShortUrl, {
        nullable: true,
    })
    async getShortUrl(
        @Arg('id', () => Int) id: number,
        @Ctx() context: Context,
    ): Promise<ShortUrl | null> {
        return await context.prismaClient.shortUrl.findFirst({
            where: {
                id: {
                    equals: id,
                },
            },
        })
    }

    @Query(() => [ShortUrl])
    async listShortUrls(
        @Arg('onlyUser', () => Boolean) onlyUser: boolean,
        @Ctx() context: Context,
    ): Promise<ShortUrl[]> {
        if (onlyUser && !context.user) {
            throw new UnauthorizedError()
        }
        return await context.prismaClient.shortUrl.findMany({
            orderBy: {
                id: 'desc',
            },
            take: 5,
            ...(onlyUser && context.user
                ? {
                      where: {
                          userId: context.user.id,
                      },
                  }
                : {}),
        })
    }

    @Mutation(() => ShortUrl, {
        nullable: false,
    })
    async createShortUrl(
        @Arg('url', () => String) url: string,
        @Ctx() context: Context,
    ): Promise<ShortUrl> {
        return await context.prismaClient.shortUrl.create({
            data: {
                url,
                ...(context.user
                    ? {
                          User: {
                              connect: {
                                  id: context.user.id,
                              },
                          },
                      }
                    : {}),
            },
        })
    }

    @Mutation(() => Boolean, {
        nullable: false,
    })
    async deleteShortUrl(
        @Arg('id', () => Int) id: number,
        @Ctx() context: Context,
    ): Promise<boolean> {
        if (!context.user) {
            throw new UnauthorizedError()
        }
        try {
            await context.prismaClient.shortUrl.deleteMany({
                where: {
                    id,
                    userId: context.user.id,
                },
            })
            return true
        } catch (error) {
            console.warn(`Failed to delete shorturl with id ${id}:`, error)
            return false
        }
    }
}
