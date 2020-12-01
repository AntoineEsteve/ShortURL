import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
    @Field(() => Int)
    id!: number
}

@ObjectType()
export class AnonymousSignInResponse {
    @Field(() => Int)
    userId!: number

    @Field(() => String)
    token!: string
}
