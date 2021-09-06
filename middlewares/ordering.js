const _ = require('lodash');

const { OrderType } = require('../constants');

module.exports = () => {
    return async (ctx, next) => {
        const orderType = _.toLower(ctx.query.orderType);

        ctx.query.orderType = !_.includes(_.values(OrderType), orderType) ? OrderType.DESC : orderType;

        await next();
    };
};
