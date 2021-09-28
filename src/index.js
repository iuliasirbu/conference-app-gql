//env
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error) {
  const path = `.env`
  dotenv.config({ path })
}
const { customConsole } = require('./utils/functions')
global.console = customConsole

const { ApolloServer } = require('apollo-server-koa')
const Koa = require('koa')

// // Auth
// // eslint-disable-next-line node/no-extraneous-require
// const cors = require('@koa/cors')
// const bodyParser = require('koa-bodyparser')

const { dbInstanceFactory } = require('./db')
const {
  contextDbInstance,
  // jwtTokenValidation,
  // jwtTokenUserIdentification,
  // correlationMiddleware,
  errorHandlingMiddleware
} = require('./middleware')
const { schema, getDataSources, getDataLoaders } = require('./startup/index')

const app = new Koa()

app.use(errorHandlingMiddleware())
// app.use(bodyParser())
// app.use(correlationMiddleware())
// app.use(cors())
// app.use(jwtTokenValidation)
// app.use(jwtTokenUserIdentification)
app.use(contextDbInstance())

const server = new ApolloServer({
  schema,
  dataSources: getDataSources,
  context: async context => {
    const { ctx, connection } = context

    if (connection) {
      return {
        ...connection.context
      }
    } else {
      const { token, dbInstance, externalUser, correlationId, request, requestSpan } = ctx
      return {
        token,
        dbInstance,
        dataLoaders: getDataLoaders(dbInstance),
        dbInstanceFactory,
        externalUser,
        correlationId,
        request,
        requestSpan
      }
    }
  },
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    maxFileSize: 1000000, // 1 MB
    maxFiles: 20
  }
})

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`🚀  Server ready at http://localhost:${port}/graphql`)
})

server.applyMiddleware({ app })

process.on('uncaughtException', function (error) {
  throw new Error(`Error occurred while processing the request: ${error.stack}`)
})
