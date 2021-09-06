const _ = require('lodash');
const validator = require('validator');

class Sanitize {
    /**
     * @param password
     * @return {*}
     */
    static cleanPassword(password) {
        return _.trim(password).replace(/ /g, '');
    }

    /**
     * @param uuids
     * @param excludeId
     * @return []
     */
    static cleanAndCastArrayUUIDs(uuids, excludeId = '') {
        return _.chain(uuids)
            .castArray()
            .filter(id => validator.isUUID(_.toString(id)) && id !== excludeId)
            .uniq()
            .sortBy()
            .value();
    }
}

module.exports = Sanitize;
