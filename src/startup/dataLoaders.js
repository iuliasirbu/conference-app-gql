const { getUserDataLoaders } = require('../features/user/dataLoaders')

module.exports = dbInstance => ({
  ...getUserDataLoaders(dbInstance)
})
