const status = require('../../utils/constants')
const {randomCharacters} = require('../../utils/functions')
const conferenceResolvers = {
  Query: {
    conferenceList: async (_parent, { pager, filters }, { dataSources }, _info) => {
      const data = await dataSources.conferenceDb.getConferenceList(pager, filters)
      return data
    },
    conference: async (_parent, { id }, { dataSources }, _info) => {
      const data = await dataSources.conferenceDb.getConferenceById(id)
      return data
    }
  },
  ConferenceList: {
    pagination: async (_parent, { pager, filters }, { dataSources }, _info) => {
      const { totalCount } = await dataSources.conferenceDb.getConferenceListTotalCount(filters)
      return { currentPage: pager, totalCount }
    }
    // ,
    // value:async(_parent,_params, _arguments,_info)=>{return}
  },
  Conference: {
    type: async ({ conferenceTypeId }, _params, { dataLoaders }, _info) => {
      const conferenceType = await dataLoaders.conferenceTypeById.load(conferenceTypeId)
      return conferenceType
    },
    category: async ({ categoryId }, _params, { dataLoaders }, _info) => {
      const category = await dataLoaders.categoryById.load(categoryId)
      return category
    },
    location: async ({ locationId }, _params, { dataLoaders }, _info) => {
      const location = await dataLoaders.locationById.load(locationId)
      return location
    },
    speakers: async ({ id }, _arguments, { dataLoaders }, _info) => {
      const speakers = await dataLoaders.speakersByConferenceId.load(id)
      return speakers
    },
    status: async ({ id }, { userEmail }, { dataLoaders }, _info) => {
      const status = await dataLoaders.statusByConferenceId.load({ id, userEmail })
      return status
    }
  },
  Location: {
    city: async ({ cityId }, _params, { dataLoaders }, _info) => {
      const city = await dataLoaders.cityById.load(cityId)
      return city
    },
    county: async ({ countyId }, _params, { dataLoaders }, _info) => {
      const county = await dataLoaders.countyById.load(countyId)
      return county
    },
    country: async ({ countryId }, _params, { dataLoaders }) => {
      const country = await dataLoaders.countryById.load(countryId)
      return country
    }
  },
  Mutation: {
    attend: async (_parent, { input }, { dataSources }, _info) => {
      const updateInput = { ...input, statusId: status.Attended }
      const statusId = await dataSources.conferenceDb.updateConferenceXAttendee(updateInput)

      return statusId ? randomCharacters(10) : null
    }
  }
}
module.exports = conferenceResolvers
