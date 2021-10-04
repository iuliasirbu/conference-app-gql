const DataLoader = require('dataloader')

const getConferencesLoaders = dbInstance => {
  return {
    
    
    locationById: new DataLoader(ids =>
      dbInstance
        .select('Id', 'Name', 'Address', 'Latitude', 'Longitude', 'CityId', 'CountyId', 'CountryId')
        .from('Location')
        .whereIn('Id', ids)
        .then(rows => ids.map(id => rows.find(x => x.id === id)))
    ),
    speakersByConferenceId: new DataLoader(ids => 
      dbInstance
        .select('s.Id', 's.Name', 's.Nationality', 's.Rating', 'c.ConferenceId', 'c.isMainSpeaker')
        .from('ConferenceXSpeaker AS c')
        .innerJoin('Speaker AS s', 'c.SpeakerId', '=', 's.Id')
        .whereIn('c.ConferenceId', ids)
        .then(rows => ids.map(id => rows.filter(row => row.conferenceId === id)))
    )
    
    
  }
}

module.exports = getConferencesLoaders