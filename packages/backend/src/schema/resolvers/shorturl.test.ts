import { graphql } from 'graphql'
import { schema } from '..'
import { Context } from '../../context'
import { ShortUrl } from '../models/shorturl'

describe('ShortUrlResolver', () => {
    let fakeShortUrls: { [id: number]: ShortUrl }
    let unauthenticatedContext: Context
    let authenticatedContext: Context

    beforeEach(() => {
        fakeShortUrls = {
            1: {
                id: 1,
                url: 'https://www.google.com',
                userid: null,
            },
            2: {
                id: 2,
                url: 'https://www.facebook.com',
                userid: 1,
            },
        }
        unauthenticatedContext = {
            prismaClient: {
                shortUrl: {
                    findFirst: jest.fn(
                        ({
                            where: {
                                id: { equals },
                            },
                        }) => fakeShortUrls[equals],
                    ),
                    findMany: jest.fn((query: any) =>
                        Object.values(fakeShortUrls).filter(
                            (shortUrl) =>
                                !query?.where?.userid ||
                                query.where.userid === shortUrl.userid,
                        ),
                    ),
                    create: jest.fn((query: any) => ({
                        id: 3,
                        url: 'https://fake.com',
                        userid: query.data.user?.connect.id,
                    })),
                    deleteMany: jest.fn(),
                },
            } as any,
        }
        authenticatedContext = {
            ...unauthenticatedContext,
            user: { id: 1 },
            token: 'token',
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
            unauthenticatedContext,
        )
        expect(errors).toBeUndefined()
        expect(
            unauthenticatedContext.prismaClient.shortUrl.findFirst,
        ).toHaveBeenCalledTimes(1)
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
            unauthenticatedContext,
        )
        expect(errors).toBeUndefined()
        expect(
            unauthenticatedContext.prismaClient.shortUrl.findFirst,
        ).toHaveBeenCalledTimes(1)
        expect(data?.getShortUrl).toEqual(null)
    })

    it('listShortUrls unauthenticated', async () => {
        const { errors, data } = await graphql(
            schema,
            `
                query ListShortUrls {
                    listShortUrls(onlyUser: false) {
                        id
                        url
                        userid
                    }
                }
            `,
            undefined,
            unauthenticatedContext,
        )
        expect(errors).toBeUndefined()
        expect(
            unauthenticatedContext.prismaClient.shortUrl.findMany,
        ).toHaveBeenCalledTimes(1)
        expect(data?.listShortUrls).toEqual(Object.values(fakeShortUrls))
    })

    it('listShortUrls authenticated', async () => {
        const { errors, data } = await graphql(
            schema,
            `
                query ListShortUrls {
                    listShortUrls(onlyUser: true) {
                        id
                        url
                        userid
                    }
                }
            `,
            undefined,
            authenticatedContext,
        )
        expect(errors).toBeUndefined()
        expect(
            unauthenticatedContext.prismaClient.shortUrl.findMany,
        ).toHaveBeenCalledTimes(1)
        expect(data?.listShortUrls).toEqual([fakeShortUrls[2]])
    })

    it('createShortUrl unauthenticated', async () => {
        const { errors, data } = await graphql(
            schema,
            `
                mutation CreateShortUrl {
                    createShortUrl(url: "https://test.io") {
                        id
                        url
                        userid
                    }
                }
            `,
            undefined,
            unauthenticatedContext,
        )
        expect(errors).toBeUndefined()
        expect(
            unauthenticatedContext.prismaClient.shortUrl.create,
        ).toHaveBeenCalledTimes(1)
        expect(data?.createShortUrl.userid).toBeNull()
    })

    it('createShortUrl authenticated', async () => {
        const { errors, data } = await graphql(
            schema,
            `
                mutation CreateShortUrl {
                    createShortUrl(url: "https://test.io") {
                        id
                        url
                        userid
                    }
                }
            `,
            undefined,
            authenticatedContext,
        )
        expect(errors).toBeUndefined()
        expect(
            unauthenticatedContext.prismaClient.shortUrl.create,
        ).toHaveBeenCalledTimes(1)
        expect(data?.createShortUrl.userid).toBeDefined()
    })

    it('deleteShortUrl unauthenticated', async () => {
        const { errors, data } = await graphql(
            schema,
            `
                mutation DeleteShortUrl {
                    deleteShortUrl(id: 1)
                }
            `,
            undefined,
            unauthenticatedContext,
        )
        expect(errors).toBeDefined()
        expect(
            unauthenticatedContext.prismaClient.shortUrl.deleteMany,
        ).toHaveBeenCalledTimes(0)
        expect(data).toBeFalsy()
    })

    it('deleteShortUrl authenticated', async () => {
        const { errors, data } = await graphql(
            schema,
            `
                mutation DeleteShortUrl {
                    deleteShortUrl(id: 1)
                }
            `,
            undefined,
            authenticatedContext,
        )
        expect(errors).toBeUndefined()
        expect(
            unauthenticatedContext.prismaClient.shortUrl.deleteMany,
        ).toHaveBeenCalledTimes(1)
        expect(data).toBeTruthy()
    })
})
