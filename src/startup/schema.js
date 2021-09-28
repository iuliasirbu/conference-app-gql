const { makeExecutableSchema } = require('apollo-server-koa')
const merge = require('lodash.merge')

const { loadTypedefsSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
const { join } = require('path')

const userResolvers = require('../features/user/resolvers')
const helloWorldResolvers = require('../features/helloWorld/resolvers')


const oldTypeDefs = []
const sources = loadTypedefsSync(join(__dirname, '../**/*.graphql'), {
  loaders: [new GraphQLFileLoader()]
})
const resolvers = merge(userResolvers, helloWorldResolvers)

const typeDefs = [...sources.map(source => source.document), ...oldTypeDefs]

module.exports = makeExecutableSchema({ typeDefs, resolvers })
module.exports.tests = { typeDefs, resolvers }
