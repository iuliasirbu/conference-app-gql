const contextDbInstance = require('./db/contextDbInstance')
const correlationMiddleware = require('./correlation/correlationMiddleware')
const validateToken = require('./auth/auth')
const errorHandlingMiddleware = require('./errorHandling/errorHandlingMiddleware')

module.exports = {
  ...validateToken,
  contextDbInstance,
  correlationMiddleware,
  errorHandlingMiddleware
}
