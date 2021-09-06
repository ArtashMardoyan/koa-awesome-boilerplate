const Router = require('koa-router');

const userRoute = require('./user');

const router = new Router({ prefix: '/v1' });

router.use(userRoute.routes());

router.get('/ping', ctx => ctx.ok('pong'));

module.exports = router;
