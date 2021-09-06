const _ = require('lodash');

const { Mailer } = require('../components');
const config = require('../config');

class ErrorTask {
    static async system(ex, ctx) {
        const emailTemplate = config.mailer.templates.errorMessage;
        const to = ['artashmardoyan@gmail.com', 'alixanyangagik@gmail.com'];

        const data = {
            stack: ex.stack,
            message: ex.message,
            stage: config.STAGE,
            method: ctx.request.method,
            originalUrl: ctx.originalUrl,
            requestBody: JSON.stringify(ctx.request.body, null, 2),
            stateUser: JSON.stringify(_.pick(ctx.state.user, ['id', 'email', 'role', 'username']), null, 2)
        };

        Mailer.send({ data, to, ...emailTemplate }).catch(console.trace);
    }
}

module.exports = ErrorTask;
