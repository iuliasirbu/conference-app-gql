const UserApi = require('../features/user/dataSources/userApi')
const UserDb = require('../features/user/dataSources/userDb')

const ds = {
  userApi: new UserApi(),
  userDb: new UserDb()
}

module.exports.getDataSources = () => ds

// This is a temporary fix to pass dataSources to ws requests. This will be fixed in Apollo server v3.0
module.exports.initializedDataSources = (context, dbInstance) => {
  ds.userApi.initialize({ context })
  ds.userDb.initialize({ context: { dbInstance } })
  return ds
}
