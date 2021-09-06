const _ = require('lodash');

const { HttpStatus } = require('../constants');
const { Security } = require('../components');

module.exports = () => async (ctx, next) => {
    await next();

    if (!Security.isReadableStream(ctx.body)) {
        if (_.isString(ctx.body)) {
            ctx.body = { message: ctx.body };
        }

        ctx.status = ctx.status || HttpStatus.NOT_FOUND;

        ctx.body = _.extend({}, { statusName: HttpStatus.getStatusText(ctx.status), statusCode: ctx.status }, ctx.body);
    }
};
