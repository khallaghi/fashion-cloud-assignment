

const Model = require('../models/model');
const utils = require('./utils/utils');

const CacheTool = function () {
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
            await this.addOrUpdateRecord({
                key: key,
                value: utils.randomgen(20)
            });
            return this.retrieve(key);
        }
    }

    this.addOrUpdateRecord = async function (record) {
        let doc = await Model.findOne({key: record.key}).exec();
        if (doc != null) {
            doc.overwrite(record)
        } else {
            doc = new Model(record);
        }
        return await doc.save()
    }

    this.retrieveAll = async function () {
        // TODO: Should paginate the return value
        return await Model.find({}, 'key value -_id').exec();
    }

    this.deleteOne = async function (key) {
        return Model.deleteOne({key: key});
    }

}

module.exports = new CacheTool()
