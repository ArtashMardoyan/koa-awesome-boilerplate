const _ = require('lodash');
const faker = require('faker');

const { UserStatus } = require('../lcp');
const config = require('../../config');

const { id: userTemplateId, count } = config.seedData.user;
const userUUID = _.template(userTemplateId);

module.exports = {
    async up(queryInterface) {
        const users = [];

        for (let i = 0; i < count; i++) {
            const userIndex = i < 10 ? `00${i}` : i < 100 ? `0${i}` : i;
            const userId = userUUID({ index: userIndex });

            const createdAt = new Date();
            const updatedAt = new Date();

            createdAt.setHours(createdAt.getHours() - i * 3);
            updatedAt.setHours(updatedAt.getHours() - i * 3);

            users.push({
                createdAt,
                updatedAt,
                id: userId,
                accessTokenSalt: 'EbJrep',
                status: UserStatus.ACTIVATED,
                lastName: faker.name.firstName(),
                firstName: faker.name.lastName(),
                email: `user-${i}@mailinator.com`,
                password: '$2a$07$jIHCC.pGmNoGzLIqy07MpOLmVEWkqAyejbTxTTSDATuQ7pjyT.7fG' // hunter
            });
        }

        await queryInterface.bulkInsert('user', users, { ignoreDuplicates: true, returning: true });
    },

    async down(queryInterface) {
        const userIds = [];

        for (let i = 0; i < count; i++) {
            const userIndex = i < 10 ? `00${i}` : i < 100 ? `0${i}` : i;
            const userId = userUUID({ index: userIndex });
            userIds.push(userId);
        }

        await queryInterface.bulkDelete('user', { id: userIds });
    }
};
