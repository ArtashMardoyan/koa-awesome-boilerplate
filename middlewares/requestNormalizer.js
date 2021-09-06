const _ = require('lodash');
const koaBody = require('koa-body');
const fileType = require('file-type');
const compose = require('koa-compose');
const readChunk = require('read-chunk');
const pagination = require('koa-pagination-v2');

const { Security } = require('../components');
const ordering = require('./ordering');
const config = require('../config');

async function normalizeFile(file) {
    const buffer = readChunk.sync(_.get(file, 'path'), 0, 4100);

    const fileInfo = (await fileType.fromBuffer(buffer)) || {};

    return !_.isEmpty(fileInfo)
        ? {
              key: `${Security.generateRandomString()}.${_.get(fileInfo, 'ext')}`,
              type: _.head(_.split(_.get(fileInfo, 'mime'), '/')),
              size: _.toString(_.get(file, 'size')),
              mime: _.get(fileInfo, 'mime'),
              ext: _.get(fileInfo, 'ext'),
              path: _.get(file, 'path'),
              name: _.get(file, 'name')
          }
        : {};
}

async function normalizer(ctx, next) {
    if (ctx.request.type === 'multipart/form-data') {
        for (const key of Object.keys(ctx.request.files)) {
            const value = _.get(ctx.request.files, key);

            if (_.isArray(value)) {
                ctx.request.files[key] = [];

                for (const item of value) {
                    ctx.request.files[key].push(await normalizeFile(item));
                }
            } else if (_.isObject(value)) {
                ctx.request.files[key] = await normalizeFile(value);
            }
        }
    }

    await next();
}

module.exports = () =>
    compose([
        koaBody({ multipart: true, formidable: { keepExtensions: true } }),
        pagination(config.validation.pagination),
        normalizer,
        ordering()
    ]);
