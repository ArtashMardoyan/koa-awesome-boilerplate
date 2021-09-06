const _ = require('lodash');

const { Sequelize, sequelize } = require('../data/models');
const { Security } = require('../components');

async function serializeModels(models, options) {
    for (const index in models) {
        if (Object.prototype.hasOwnProperty.call(models, index)) {
            const field = models[index];

            if (_.isArray(field)) {
                models[index] = await serializeModels(field, options);
            } else if (_.isObject(field)) {
                models[index] = await serializeModel(field, options);
            }
        }
    }

    return models;
}

async function serializeModel(model, options) {
    if (model instanceof Sequelize.Model) {
        if (_.isFunction(model.fields)) {
            model = await model.fields(sequelize.models, options);
        }

        if (_.isFunction(model.get)) {
            model = model.get();
        }
    }

    for (const value in model) {
        if (Object.prototype.hasOwnProperty.call(model, value)) {
            const field = model[value];

            if (_.isArray(field)) {
                model[value] = await serializeModels(field, options);
            } else if (_.isObject(field)) {
                model[value] = await serializeModel(field, options);
            }
        }
    }

    return model;
}

async function serialize(data, options) {
    if (_.isArray(data)) {
        data = await serializeModels(data, options);
    } else if (_.isObject(data)) {
        data = await serializeModel(data, options);
    }

    return data;
}

module.exports = () => {
    return async function (ctx, next) {
        await next();

        if (ctx.method === 'HEAD') {
            ctx.body = undefined;
        } else if (ctx.body) {
            const options = { userId: _.get(ctx, 'state.user.id') };

            if (!Security.isReadableStream(ctx.body)) {
                ctx.body = await serialize(ctx.body, options);
            }
        }
    };
};

module.exports.serializeModel = serializeModel;
