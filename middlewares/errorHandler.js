const _ = require('lodash');

const { AppEnvironment, ErrorMessages, ErrorType, HttpStatus } = require('../constants');
const { PaymentGatewayType } = require('../data/lcp');
const { ErrorTask } = require('../tasks');
const config = require('../config');

module.exports = () => async (ctx, next) => {
    try {
        await next();
    } catch (ex) {
        let exceptions = [];
        const { VALIDATION_ERROR_NAMES, AGGREGATE_ERROR, STRING_TO_UUID } = ErrorType;

        if (_.includes(ex.type, _.startCase(PaymentGatewayType.STRIPE))) {
            ctx.status = HttpStatus.PAYMENT_REQUIRED;

            return (ctx.body = {
                statusName: HttpStatus.getStatusText(ctx.status),
                statusCode: ctx.status,
                message: ex.message
            });
        }

        if (_.get(ex, 'original.routine') === STRING_TO_UUID) {
            ctx.status = HttpStatus.NOT_FOUND;
            return (ctx.body = {
                statusName: HttpStatus.getStatusText(ctx.status),
                statusCode: ctx.status,
                message: ErrorMessages.INVALID_RESOURCE_ID
            });
        }

        if (ex.name === AGGREGATE_ERROR) {
            for (const err of Array.from(ex)) {
                exceptions.push(...err.errors.errors);
            }
        } else if (VALIDATION_ERROR_NAMES.includes(ex.name)) {
            exceptions = _.isEmpty(ex.errors) ? [ex.original] : ex.errors;
        }

        if (!_.isEmpty(exceptions)) {
            const errors = [];

            if (ex && !_.isEmpty(exceptions)) {
                for (const err of Object.values(exceptions)) {
                    const message = err.kind === 'user defined' ? err.message : err.kind || err.message;

                    errors.push({
                        field: err.path || err.constraint,
                        message: _.snakeCase(`err_${message.toLocaleLowerCase()}`)
                    });
                }
            }

            ctx.status = HttpStatus.UNPROCESSABLE_ENTITY;
            return (ctx.body = {
                statusName: HttpStatus.getStatusText(ctx.status),
                message: 'ValidationError',
                statusCode: ctx.status,
                errors
            });
        }

        console.error(ex);

        if (config.NODE_ENV !== AppEnvironment.LOCAL) {
            ErrorTask.system(ex, ctx).catch(console.trace);
        }

        ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
        ctx.body = { statusName: HttpStatus.getStatusText(ctx.status), statusCode: ctx.status };
    }
};
