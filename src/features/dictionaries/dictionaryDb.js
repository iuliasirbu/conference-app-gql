const { SQLDataSource } = require("../../utils/sqlDataSource");

const commonColumns = ['Id', 'Name', 'Code']

class DictionaryDb extends SQLDataSource {
    async getTypeList(){
        const result = await this.knex('DictionaryConferenceType').select(...commonColumns)
        return result
    }

    async getCategoryList(){
        const result = await this.knex('DictionaryCategory').select(...commonColumns)
        return result
    }

    async getCountryList(){
        const result = await this.knex('DictionaryCountry').select(...commonColumns)
        return result
    }

    async getCountyList(){
        const result = await this.knex('DictionaryCounty').select(...commonColumns)
        return result
    }

    async getCityList(){
        const result = await this.knex('DictionaryCity').select(...commonColumns)
        return result
    }
}

module.exports = DictionaryDb