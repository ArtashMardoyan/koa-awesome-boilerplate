const _ = require('lodash');

const { SortType } = require('../constants');

module.exports = () => {
    return async (ctx, next) => {
        const orderType = _.toLower(ctx.query.orderType);

        ctx.query.orderType = !_.includes(_.values(SortType), orderType) ? SortType.DESC : orderType;

        await next();
    };
};
