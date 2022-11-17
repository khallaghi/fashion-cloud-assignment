const Model = require('../models/model');
const utils = require('../utils/utils');
const moment = require('moment')

const CacheTool = function () {
    this.retrieve = async function (key) {
        return await Model.findOne({key: key}).exec();
    }

    this.isTtlExceeded = function (record) {
        return Date.now() > record.ttl;
    }

    this.handleMissedCache = async function (key) {
        console.log('cache miss')
        await this.addOrUpdateRecord({
            key: key,
            value: utils.randomgen(20)
        });
        return await this.retrieve(key)['value'];
    }


    this.retrieveAndUpdate = async function (key) {
        try {
            const record = await this.retrieve(key);
            await this.updateCreatedAt(record)
            console.log('cache hit')
            return record['value'];
        } catch (error) {
            return this.handleMissedCache(key);
        }
    }

    this.updateCreatedAt = async function (record) {
        record.createdAt = Date.now()
        await this.addOrUpdateRecord(record)
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
        await Model.find({}, 'key value -_id').exec();
    }

    this.deleteOne = async function (key) {
        return Model.deleteOne({key: key});
    }

    this.deleteAll = async function () {
        return Model.deleteMany();
    }
}

module.exports = new CacheTool()
