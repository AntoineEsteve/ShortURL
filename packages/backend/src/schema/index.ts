import 'reflect-metadata'
import { buildSchemaSync } from 'type-graphql'
import { ShortUrlResolver } from './resolvers/shorturl'
import { UserResolver } from './resolvers/user'

export const schema = buildSchemaSync({
    resolvers: [ShortUrlResolver, UserResolver],
})
