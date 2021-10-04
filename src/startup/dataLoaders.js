const { getUserDataLoaders } = require('../features/user/dataLoaders')
const getConferencesLoaders = require('../features/conference/dataLoaders')
const getDictionaryLoaders = require('../features/dictionaries/dataLoaders')

module.exports = dbInstance => ({
  ...getUserDataLoaders(dbInstance),
  ...getConferencesLoaders(dbInstance),
  ...getDictionaryLoaders(dbInstance)
})