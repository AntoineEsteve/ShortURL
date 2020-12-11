import { graphql } from 'graphql'
import { schema } from '..'
import { Context } from '../../context'
import { User } from '../models/user'

describe('UserResolver', () => {
    it('anonymousSignIn for an authenticated user', async () => {
        const user: User = {
            id: 1,
        }
        const token = 'token'
        const context: Context = {
            prismaClient: {} as any,
            user,
            token,
        }
        const { errors, data } = await graphql(
            schema,
            `
                mutation AnonymousSignIn {
                    anonymousSignIn {
                        userid
                        token
                    }
                }
            `,
            undefined,
            context,
        )
        expect(errors).toBeUndefined()
        expect(data).toEqual({
            anonymousSignIn: {
                userid: user.id,
                token,
            },
        })
    })

    it('anonymousSignIn for an unauthenticated user', async () => {
        const user: User = {
            id: 2,
        }
        const context: Context = {
            prismaClient: {
                user: {
                    create: jest.fn(() => user),
                },
            } as any,
        }
        const { errors, data } = await graphql(
            schema,
            `
                mutation AnonymousSignIn {
                    anonymousSignIn {
                        userid
                        token
                    }
                }
            `,
            undefined,
            context,
        )
        expect(errors).toBeUndefined()
        expect(context.prismaClient.user.create).toHaveBeenCalledTimes(1)
        expect(data?.anonymousSignIn.userid).toEqual(user.id)
        expect(typeof data?.anonymousSignIn.token).toEqual('string')
    })
})
