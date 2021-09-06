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

    /**
     * @return []
     * @param emails
     * @param excludeEmail
     */
    static cleanAndCastArrayEmails(emails = [], excludeEmail = '') {
        return _.uniq(
            _.reduce(
                _.castArray(emails),
                (all, email) => {
                    if (validator.isEmail(email) && email !== excludeEmail) {
                        email = validator.normalizeEmail(_.trim(email));
                        all.push(email);
                    }
                    return all;
                },
                []
            )
        );
    }

    /**
     * @return []
     * @param array
     */
    static cleanAndCastArray(array) {
        return _.uniq(_.compact(_.castArray(array)));
    }

    /**
     * @return []
     * @param open
     */
    static validateOpenObject(open) {
        return _.chain(open)
            .castArray()
            .filter(o => _.isObject(o) && _.has(o, 'start') && _.has(o, 'end'))
            .map(o => _.pick(o, ['start', 'end']))
            .value();
    }
}

module.exports = Sanitize;
