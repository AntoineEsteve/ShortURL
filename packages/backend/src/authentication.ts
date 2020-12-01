import '@prisma/client' // Set up the environement variables using prisma/.env

export const authenticationSecret = process.env.AUTHENTICATION_SECRET ?? ''

if (!authenticationSecret) {
    throw 'AUTHENTICATION_SECRET env variable required'
}
