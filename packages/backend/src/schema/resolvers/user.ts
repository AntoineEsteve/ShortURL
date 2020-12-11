import jsonwebtoken from 'jsonwebtoken'
import { Ctx, Mutation, Resolver } from 'type-graphql'
import { authenticationSecret } from '../../authentication'
import { Context } from '../../context'
import { AnonymousSignInResponse } from '../models/user'

@Resolver()
export class UserResolver {
    @Mutation(() => AnonymousSignInResponse, {
        nullable: false,
    })
    async anonymousSignIn(
        @Ctx() context: Context,
    ): Promise<AnonymousSignInResponse> {
        if (!context.user) {
            const user = await context.prismaClient.user.create({ data: {} })
            const token = jsonwebtoken.sign(user, authenticationSecret)
            return { token, userid: user.id }
        }
        return { token: context.token!, userid: context.user.id }
    }
}
