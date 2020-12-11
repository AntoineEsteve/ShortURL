import { graphql } from 'graphql'
import { schema } from '..'
import { Context } from '../../context'
import { ShortUrl } from '../models/shorturl'

describe('UserResolver', () => {
    let fakeShortUrls: { [id: number]: ShortUrl }
    let context: Context

    beforeEach(() => {
        fakeShortUrls = {
            1: {
                id: 1,
                url: 'https://www.google.com',
                userid: null,
            },
        }
        context = {
            prismaClient: {
                shortUrl: {
                    findFirst: jest.fn(
                        ({
                            where: {
                                id: { equals },
                            },
                        }) => fakeShortUrls[equals],
                    ),
                },
            } as any,
        }
    })

    it('getShortUrl with an existing id', async () => {
        const { errors, data } = await graphql(
            schema,
            `
                query GetShortUrl {
                    getShortUrl(id: 1) {
                        id
                        url
                        userid
                    }
                }
            `,
            undefined,
            context,
        )
        expect(errors).toBeUndefined()
        expect(context.prismaClient.shortUrl.findFirst).toHaveBeenCalledTimes(1)
        expect(data?.getShortUrl).toEqual(fakeShortUrls[1])
    })

    it('getShortUrl with an incorrect id', async () => {
        const { errors, data } = await graphql(
            schema,
            `
                query GetShortUrl {
                    getShortUrl(id: 999) {
                        id
                        url
                        userid
                    }
                }
            `,
            undefined,
            context,
        )
        expect(errors).toBeUndefined()
        expect(context.prismaClient.shortUrl.findFirst).toHaveBeenCalledTimes(1)
        expect(data?.getShortUrl).toEqual(null)
    })
})
