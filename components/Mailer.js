const _ = require('lodash');
const sgMail = require('@sendgrid/mail');

const config = require('../config');

class Mailer {
    static async send(context) {
        try {
            if (_.isEmpty(context.to)) {
                console.error(`Mailer----Send email addressees are required'`);
                return false;
            }

            sgMail.setApiKey(config.SENDGRID_API_KEY);

            await sgMail.send({
                to: context.to,
                subject: context.subject,
                from: context.from || config.mailer.from,
                cc: _.get(context, 'cc', []),
                templateId: _.get(context, 'templateId'),
                bcc: _.get(context, 'bcc', []),
                attachments: _.get(context, 'data.attachments', []),
                substitutions: _.extend(context.data, { date: new Date().getFullYear() })
            });

            return true;
        } catch (e) {
            console.error('Mailer----Send' + e);
            return false;
        }
    }
}

module.exports = Mailer;
