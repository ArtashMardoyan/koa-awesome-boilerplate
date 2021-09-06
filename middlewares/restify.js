const respond = require('koa-respond');
const compose = require('koa-compose');

const { HttpStatus } = require('../constants');
const errorHandler = require('./errorHandler');
const serializer = require('./serializer');
const negotation = require('./negotation');

module.exports = () =>
    compose([
        respond({
            statusMethods: {
                ok: HttpStatus.OK,
                created: HttpStatus.CREATED,
                accepted: HttpStatus.ACCEPTED,
                noContent: HttpStatus.NO_CONTENT,
                movedPermanently: HttpStatus.MOVED_PERMANENTLY,
                movedTemporarily: HttpStatus.MOVED_TEMPORARILY,
                notModified: HttpStatus.NOT_MODIFIED,
                notAcceptable: HttpStatus.NOT_ACCEPTABLE,
                unsupportedMediaType: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                unprocessableEntity: HttpStatus.UNPROCESSABLE_ENTITY
            }
        }),
        errorHandler(),
        negotation(),
        serializer()
    ]);
