require('dotenv').config();

const seedData = require('./seedData');
const mailer = require('./mailer');

module.exports = {
    mailer,
    seedData,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    STAGE: process.env.STAGE,
    JWT_SECRET: process.env.JWT_SECRET,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    db: {
        host: process.env.RDS_HOST,
        database: process.env.RDS_DB,
        dialect: process.env.RDS_DIALECT,
        username: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        logging: process.env.RDS_LOGGING === 'true' ? console.log : null
    }
};
