const moment = require('moment')

const Utils = function() {
    this.randomgen= function (length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    this.getDefaultTTL = function () {
        return process.env.TTL_OFFSET + process.env.TTL_UNIT;
    }
}
module.exports = new Utils();