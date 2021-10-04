const dictionaryResolvers = {
  Query: {
    typeList: async (_parent, _args, { dataSources }, _info) => {
      const typeList = await dataSources.dictionaryDb.getTypeList()
      return typeList
    },
    categoryList: async (_p, _a, { dataSources }) => {
      const categoryList = await dataSources.dictionaryDb.getCategoryList()
      return categoryList
    },
    countryList: async (_p, _a, { dataSources }) => {
      const countryList = await dataSources.dictionaryDb.getCountryList()
      return countryList
    },
    countyList: async (_p, _a, { dataSources }) => {
      const countyList = await dataSources.dictionaryDb.getCountyList()
      return countyList
    },
    cityList: async (_p, _a, { dataSources }) => {
      const cityList = await dataSources.dictionaryDb.getCityList()
      return cityList
    }
  }
}

module.exports = dictionaryResolvers
