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
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
};
