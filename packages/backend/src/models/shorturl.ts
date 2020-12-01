import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class ShortUrl {
    @Field(() => Int)
    id!: number

    @Field(() => String)
    url!: string

    @Field(() => Int, { nullable: true })
    userId!: number | null
}
