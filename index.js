const app = new (require('koa'))();

const v1Routes = require('./routes/v1');
const config = require('./config');

/**
 * ############## MIDDLEWARES ##############
 */
app.use(require('@koa/cors')());
app.use(require('./middlewares/restify')());
app.use(require('./middlewares/requestNormalizer')());

/**
 * ############## ROUTES ##############
 */
app.use(v1Routes.routes());
app.use(v1Routes.allowedMethods());

/**
 * ############## SERVER CONFIGURATION ##############
 */
const port = process.env.PORT || config.PORT;
const server = require('http').createServer(app.callback());

server.listen(port, () => {
    console.info(`Server is running on port : ${port}`);
});
