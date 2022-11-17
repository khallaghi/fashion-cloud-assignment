const Model = require('../models/model');
const utils = require('../utils/utils');
const moment = require('moment')

const CacheTool = function () {
    this.retrieve = async function (key) {
        return await Model.findOne({key: key}).exec();
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

    this.checkAndReduceCacheSize = async function(record) {
        // In this function I delete a record if the size of the cache reached to its maximum capacity
        // The strategy to delete is simply by finding the oldest record that viewed and delete it.
        // Also note that since I use expires feature of mongo which delete the documents that reach the end of
        // their life some old records even before calling this function have been removed

        const size = parseInt(process.env.CACHE_SIZE)
        const currentSize = await Model.countDocuments();
        if (currentSize >= size) {
            Model.findOne().sort('-created_at').exec((err, rec) => {
               Model.deleteOne(record).exec((err, rec) => {
                   console.log('record deleted due to lack of space:')
                   console.log(rec)
               })
            })
        }
    }

    this.addNewRecord = async function(record) {
        await this.checkAndReduceCacheSize()
        const data = new Model(record);
        return await data.save()
    }

    this.addOrUpdateRecord = async function (record) {
        let doc = await Model.findOne({key: record.key}).exec();
        if (doc != null) {
            doc.overwrite(record)
            return await doc.save()
        }
        return await this.addNewRecord(record)
    }

    this.retrieveAll = async function () {
        // TODO: Should paginate the return value
        return await Model.find({}, 'key value -_id').exec();
    }

    this.deleteOne = async function (key) {
        return Model.deleteOne({key: key}).exec();
    }

    this.deleteAll = async function () {
        return Model.deleteMany().exec();
    }
}

module.exports = new CacheTool()
