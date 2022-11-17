const Model = require('../models/model');
const utils = require('./utils/utils');

const CacheTool = function() {
    this.retrieve = async function (key) {
        const record = await Model.findOne({key: key}).exec()
        return record['value'];
    }

    this.retrieveAndUpdate = async function (key) {
        try {
            const value = await this.retrieve(key);
            console.log('cache hit')
            return value

        } catch (error) {
            console.log('cache miss')
            await this.addRecord({
                key: key,
                value: utils.randomgen(20)
            });
            return this.retrieve(key);
        }
    }

    this.addRecord = async function (record) {
        const data = new Model(record);
        await data.save();
    }

    this.retrieveAll = async function () {
        // TODO: Should paginate the return value
        return await Model.find({}, 'key value -_id').exec();
    }


}

module.exports = new CacheTool()
