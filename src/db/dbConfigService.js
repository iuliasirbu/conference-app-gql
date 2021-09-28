const { postProcessDbResponse } = require('../utils/functions')

const generateKnexConfig = ({ server, port, userId, password, database }) => ({
  client: 'mssql',
  connection: {
    host: server,
    port: parseInt(port) || null,
    user: userId,
    password: password,
    database: database,
    options: {
      enableArithAbort: true,
      encrypt: true
    }
  },
  pool: {
    min: 5,
    max: 25,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    createRetryIntervalMillis: 200,
    idleTimeoutMillis: 5000
  },
  useNullAsDefault: true,
  postProcessResponse: postProcessDbResponse
})

const getDbConfig = () => {
  const { DB_HOST: server, DB_PORT: port, DB_USER: userId, DB_PASSWORD: password, DB_DATABASE: database } = process.env

  const dbConfig = generateKnexConfig({ server, port, userId, password, database })
  return [dbConfig, true]
}

module.exports = { getDbConfig, generateKnexConfig }
